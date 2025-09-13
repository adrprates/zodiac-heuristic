import { useEffect, useState } from "react";
import { fetchSimulation } from "./services/api";
import MapGrid from "./components/MapGrid";
import BattleLog from "./components/BattleLog";
import Summary from "./components/Summary";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSimulation()
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (!data) return <div>Erro ao carregar dados</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Simulação Saint Seiya</h1>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        {/* Mapa à esquerda */}
        <MapGrid grid={data.grid} path={data.path} />

        {/* Log e resumo à direita */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <BattleLog battleLog={data.battleLog} />
          <Summary totalTime={data.totalTime} energyStatus={data.energyStatus} />
        </div>
      </div>
    </div>
  );
}

export default App;
