import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadMap() {
  const filePath = path.join(__dirname, "../mapa.csv");
  const csv = readFileSync(filePath, "utf8");

  const grid = parse(csv, { delimiter: ",", trim: true });

  let start = null;
  let end = null;
  const houses = {};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const val = grid[i][j];
      if (val === "F") start = [i, j];
      if (val === "I") end = [i, j];
      if (/^K\d+$/.test(val)) {
        houses[val] = [i, j];
      }
    }
  }

  return { grid, start, end, houses };
}