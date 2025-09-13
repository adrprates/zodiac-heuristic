const BASE_URL = "http://localhost:3001";
export async function fetchSimulation() {
  const res = await fetch(`${BASE_URL}/simulate`);
  if (!res.ok) throw new Error("Erro ao buscar simulação");
  return res.json();
}
