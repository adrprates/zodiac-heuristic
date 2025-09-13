import React from "react";

function Summary({ totalTime, energyStatus }) {
  if (totalTime === undefined || !energyStatus) {
    return <p>Carregando resumo...</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Resumo da Simulação</h2>
      <p>
        <strong>Tempo Total da Missão:</strong> {totalTime.toFixed(2)} minutos
      </p>
      <p>
        <strong>Energia Final dos Cavaleiros:</strong>{" "}
        {Object.entries(energyStatus)
          .map(([c, e]) => `${c}: ${e}`)
          .join(", ")}
      </p>
    </div>
  );
}

export default Summary;