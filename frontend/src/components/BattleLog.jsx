import React from "react";

function BattleLog({ battleLog }) {
  if (!battleLog || battleLog.length === 0) {
    return <p>Carregando batalhas...</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Log das Batalhas</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={thStyle}>Casa</th>
            <th style={thStyle}>Participantes</th>
            <th style={thStyle}>Tempo da Batalha</th>
            <th style={thStyle}>Energia Restante</th>
          </tr>
        </thead>
        <tbody>
          {battleLog.map((battle, index) => (
            <tr key={index}>
              <td style={tdStyle}>{battle.house || "—"}</td>
              <td style={tdStyle}>{battle.participants?.join(", ") || "—"}</td>
              <td style={tdStyle}>{battle.battleTime?.toFixed(2) || "—"} min</td>
              <td style={tdStyle}>
                {battle.remainingEnergy
                  ? Object.entries(battle.remainingEnergy)
                      .map(([c, e]) => `${c}: ${e}`)
                      .join(", ")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid #333",
  padding: "5px",
  backgroundColor: "#262255ff",
};

const tdStyle = {
  border: "1px solid #333",
  padding: "5px",
  textAlign: "center",
};

export default BattleLog;