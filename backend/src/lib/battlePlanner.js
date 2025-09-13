// Template inicial de cavaleiros com nome, poder e energia
// power: multiplicador de força, energy: número de lutas que podem participar
export const bronzeKnightsTemplate = [
  { name: "Seiya", power: 1.5, energy: 5 },
  { name: "Shiryu", power: 1.4, energy: 5 },
  { name: "Hyoga", power: 1.3, energy: 5 },
  { name: "Shun", power: 1.2, energy: 5 },
  { name: "Ikki", power: 1.1, energy: 5 },
];

// Dificuldade de cada casa
const houseDifficulties = {
  K1: 50,   K2: 55,  K3: 60,  K4: 70,
  K5: 75,   K6: 80,  K7: 85,  K8: 90,
  K9: 95,   K10: 100, K11: 110, K12: 120,
};

/*
  Simula uma batalha em uma casa
  - Calcula tempo = dificuldade / soma dos poderes dos participantes
  - Reduz energia dos cavaleiros participantes
  - Retorna estado atualizado e tempo da batalha
 */
function simulateBattle(house, participants, state) {
  const difficulty = houseDifficulties[house];
  const totalPower = participants.reduce((sum, p) => sum + p.power, 0);

  if (totalPower === 0) return { time: Infinity, newState: null };

  const battleTime = difficulty / totalPower;

  // Cria cópia do estado para evitar mutação do original
  const newKnights = state.map(k => ({ ...k }));

  // Reduz energia dos participantes
  participants.forEach(p => {
    const knight = newKnights.find(k => k.name === p.name);
    if (knight) knight.energy = Math.max(0, knight.energy - 1);
  });

  // Checa se pelo menos um cavaleiro ainda está vivo
  const alive = newKnights.some(k => k.energy > 0);
  if (!alive) return { time: Infinity, newState: null };

  return { time: battleTime, newState: newKnights };
}

/*
  Seleciona cavaleiros de forma otimizada para cada casa
  Estratégias aplicadas:
  1. Casas mais fortes recebem mais cavaleiros
  2. Casas fracas usam menos cavaleiros
  3. Cavaleiros mais fortes são priorizados
 */
function selectParticipantsOptimized(house, state) {
  const difficultyRank = parseInt(house.replace("K", ""));
  const alive = state.filter(k => k.energy > 0).sort((a, b) => b.power - a.power);

  // Número de participantes proporcional à dificuldade
  const maxParticipants = Math.min(alive.length, Math.ceil(difficultyRank / 4));
  const participants = alive.slice(0, maxParticipants);

  return participants;
}

/*
  Planejamento completo da missão
  - Ordena casas do mais difícil para mais fácil
  - Seleciona cavaleiros usando heurística de força + dificuldade
  - Simula batalhas e registra tempo e energia restante
  Habilidades aplicadas:
  - "Greedy Assignment" (Tarefa Gananciosa) (prioriza cavaleiros fortes para casas fortes)
  - "Resource Management" (Gestão de Recursos) (energia dos cavaleiros)
 */
export function planBattlesOptimized() {
  const houses = Object.keys(houseDifficulties).sort((a, b) => houseDifficulties[b] - houseDifficulties[a]);

  let state = bronzeKnightsTemplate.map(k => ({ ...k }));
  const battleLog = [];
  let totalTime = 0;

  for (const house of houses) {
    const participants = selectParticipantsOptimized(house, state);

    const { time, newState } = simulateBattle(house, participants, state);
    if (!newState || time === Infinity) {
      throw new Error(`Todos os cavaleiros morreram antes da casa ${house}`);
    }

    state = newState;
    totalTime += time;

    battleLog.push({
      house,
      participants: participants.map(p => p.name),
      battleTime: Number(time.toFixed(2)),
      remainingEnergy: Object.fromEntries(state.map(k => [k.name, k.energy])),
    });
  }

  return {
    log: battleLog,
    totalBattleTime: Number(totalTime.toFixed(2)),
    energyStatus: Object.fromEntries(state.map(k => [k.name, k.energy])),
  };
}