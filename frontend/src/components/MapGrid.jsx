import React, { useEffect, useState } from "react";
import "./MapGrid.css";

function MapGrid({ grid, path }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Evita erro se grid ou path ainda não existirem
  if (!grid || !path) return <p>Carregando mapa...</p>;

  useEffect(() => {
    if (!path || path.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < path.length) return prev + 1;
        clearInterval(interval); // Para quando chegar ao final
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [path]);

  // Conjunto das posições do caminho atualmente animado
  const pathSet = new Set(path.slice(0, currentIndex).map(([x, y]) => `${x},${y}`));

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <div className="legend">
          <span className="legend-cell F"></span> Início (F)
          <span className="legend-cell I"></span> Fim (I)
          <span className="legend-cell K"></span> Casas K1..K12
          <span className="legend-cell M"></span> Montanhoso
          <span className="legend-cell P"></span> Plano
          <span className="legend-cell R"></span> Rochoso
          <span className="legend-cell path"></span> Caminho A*
        </div>

        <div className="map-grid">
          {grid.map((row, i) => (
            <div key={i} className="map-row">
              {row.map((cell, j) => {
                let className = "map-cell";
                let label = "";

                if (cell === "P") className += " P";
                else if (cell === "M") className += " M";
                else if (cell === "R") className += " R";
                else if (cell === "F") className += " F";
                else if (cell === "I") className += " I";
                else if (cell.startsWith("K")) {
                  className += " K";
                  label = cell;
                }

                // Marca caminho animado sem alterar o valor original
                if (pathSet.has(`${i},${j}`) && !["F", "I"].includes(cell) && !cell.startsWith("K")) {
                  className += " path";
                }

                return (
                  <div key={j} className={className} title={cell}>
                    {label}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapGrid;