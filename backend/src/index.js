import express from "express";
import cors from "cors";
import { loadMap } from "./lib/mapLoader.js";
import { aStarFullPath } from "./lib/astar.js";
import { planBattlesOptimized } from "./lib/battlePlanner.js";

const app = express();
app.use(cors());
const PORT = 3001;

const { grid, start, end, houses } = loadMap();

app.get("/simulate", (req, res) => {
  try {
    const pathResult = aStarFullPath(grid, start, houses, end);
    const battleResult = planBattlesOptimized();

    const travelCost = pathResult.cost;
    const totalBattleTime = battleResult.totalBattleTime;
    const totalTime = travelCost + totalBattleTime;

    res.json({
      grid,
      path: pathResult.path,
      travelCost,
      battleLog: battleResult.log,
      totalBattleTime,
      totalTime,
      energyStatus: battleResult.energyStatus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao simular batalhas ou caminho" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});