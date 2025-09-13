// Função heurística utilizada na busca A*
// Calcula a distância Manhattan entre dois pontos (x, y)
// É uma heurística admissível para grids 4-direcionais (não diagonal)
// Habilidade aplicada: A* usa g + h, onde g = custo real até o nó, h = heurística estimada até o objetivo
function heuristic(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

// Função que determina o custo de atravessar diferentes tipos de terreno
// Permite que o algoritmo penalize terrenos mais difíceis (montanhoso M e rochoso R)
// Terrenos planos (P) e casas especiais (F, I, Kx) tem custo baixo
// Habilidade aplicada: "Weighted Graph Traversal", influenciando g(n)
function terrainCost(val) {
  if (val === "M") return 200; // terreno montanhoso alto custo
  if (val === "R") return 5;   // terreno rochoso custo médio
  return 1;                     // plano ou casas especiais custo mínimo
}

// Função principal de busca A* entre dois pontos
// grid: matriz do mapa, start: ponto inicial, goal: objetivo final
function findPath(grid, start, goal) {
  const directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1], // movimentos 4-direcionais
  ];

  // Lista open inicializada com start, g = 0, f = g + h
  const open = [{ pos: start, g: 0, f: heuristic(start, goal), path: [start] }];
  const visited = new Set(); // evita visitar nós repetidos (loop infinito)

  while (open.length) {
    // Busca gulosa: escolhe nó com menor f (g + h) => A* otimizado
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();

    const key = current.pos.join(",");
    if (visited.has(key)) continue; // nó já visitado, ignora
    visited.add(key);

    // Checagem de objetivo
    if (current.pos[0] === goal[0] && current.pos[1] === goal[1]) {
      return { path: current.path, cost: current.g }; // retorna caminho e custo acumulado
    }

    // Expande vizinhos
    for (const [dx, dy] of directions) {
      const nx = current.pos[0] + dx;
      const ny = current.pos[1] + dy;

      // Ignora fora do grid
      if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length) continue;

      const val = grid[nx][ny];
      const g = current.g + terrainCost(val); // custo acumulado real

      // Adiciona nó vizinho à lista open
      open.push({
        pos: [nx, ny],
        g,
        f: g + heuristic([nx, ny], goal), // f = g + h
        path: [...current.path, [nx, ny]],
      });
    }
  }

  return { path: [], cost: Infinity }; // não encontrou caminho
}

// Função que calcula caminho completo do início até todas as casas e fim
// Usa A* sequencialmente entre start -> casas ordenadas -> end
export function aStarFullPath(grid, start, houses, end) {
  const orderedHouses = Object.keys(houses).sort(
    (a, b) => Number(a.substring(1)) - Number(b.substring(1)) // ordena K1, K2, ...
  );

  let totalCost = 0;
  let fullPath = [];
  let current = start;

  // Passa por todas as casas
  for (const h of orderedHouses) {
    const target = houses[h];
    const { path, cost } = findPath(grid, current, target);
    const newPath = fullPath.length ? path.slice(1) : path; // remove duplicação de ponto inicial
    fullPath = [...fullPath, ...newPath];
    totalCost += cost;
    current = target;
  }

  // Vai da última casa até o objetivo final
  const { path, cost } = findPath(grid, current, end);
  const newPath = fullPath.length ? path.slice(1) : path;
  fullPath = [...fullPath, ...newPath];
  totalCost += cost;

  return { path: fullPath, cost: totalCost };
}