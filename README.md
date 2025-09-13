# zodiac-heuristic

### Projeto A* Heurístico com Planejamento de Batalhas

Este projeto é uma **simulação de caminho e batalhas** utilizando o algoritmo **A\*** em um mapa representado por CSV, com terreno diferenciado, e um **planejamento estratégico de cavaleiros** para enfrentar casas com diferentes dificuldades.  
Ele combina **JavaScript/JSX**, **Vite**, e conceitos de heurística, grafos ponderados e otimização gananciosa.


---

## ⚙️ Tecnologias

- **JavaScript / JSX**: lógica do A* e planejamento de batalhas  
- **Vite**: bundler e dev server para o frontend  
- **CSV**: representação do mapa do jogo  
- **Heurísticas**: A* com distância Manhattan  
- **Estratégia Gananciosa**: planejamento de cavaleiros baseado em poder e energia  

---

## 🔹 astar.js

Responsável por calcular o **caminho ótimo** no mapa, considerando terrenos de diferentes custos:

- **heuristic(a, b)**  
  Calcula a distância Manhattan entre dois pontos.  
  *Habilidade aplicada: A* usa `g + h`, onde `g` = custo real até o nó, `h` = heurística estimada até o objetivo.*

- **terrainCost(val)**  
  Define o custo de atravessar diferentes terrenos:  
  - Montanhoso (M) → alto custo  
  - Rochoso (R) → custo médio  
  - Plano / Casas especiais → custo mínimo  

- **findPath(grid, start, goal)**  
  Implementa o **A\***, expandindo nós 4-direcionalmente e evitando loops. Retorna **caminho e custo total**.

- **aStarFullPath(grid, start, houses, end)**  
  Calcula o caminho completo do início, passando por todas as casas e chegando ao objetivo final.  

💡 O A* aplicado aqui é um **"Weighted Graph Traversal"**, onde cada tipo de terreno influencia o custo `g(n)`.

---

## 🔹 battlePlanner.js

Responsável pelo **planejamento estratégico de cavaleiros** para enfrentar casas no mapa:

- **bronzeKnightsTemplate**: cavaleiros iniciais com `nome`, `poder` e `energia`.  

- **simulateBattle(house, participants, state)**  
  Simula uma batalha em uma casa, reduzindo energia e calculando o tempo da luta.  

- **selectParticipantsOptimized(house, state)**  
  Seleciona cavaleiros de forma otimizada para cada casa com base em dificuldade e energia restante.  

- **planBattlesOptimized()**  
  Planejamento completo da missão, aplicando:
  - **Greedy Assignment**: cavaleiros fortes para casas difíceis  
  - **Resource Management**: controle de energia restante  

Retorna o **log detalhado**, tempo total de batalha e estado de energia final dos cavaleiros.

---

## 🚀 Como rodar

### 1. Backend
No diretório `backend/src`, instale as dependências:

```bash
npm install
```

E rode com:

```bash
npm start
```

### 2. Frontend
No diretório `frontend`, instale dependências (se ainda não tiver):

```bash
npm install
```

E rode com Vite usando

```bash
npm run dev
```

O frontend será iniciado pelo Vite, normalmente acessível em:

```bash
http://localhost:5173
```



