export const code = `
import { csvParse } from "d3-dsv";

export async function loadAndProcessIPGData(
  url: string,
  maxIPG: number,
  maxPoints = 10000
): Promise<Array<{ x: number; y: number }>> {
  /**
   * Carrega e processa dados de timestamp para gerar IPG (Inter-Packet Gap).
   * O IPG representa o intervalo de tempo entre dois pacotes consecutivos.
   * 
   * @returns Um array de objetos { x, y } onde:
   *  - x: índice do pacote (começando do 1)
   *  - y: intervalo de tempo entre o pacote atual e o anterior (em segundos)
  */
  try {
    // Faz a requisição para obter os dados do arquivo CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(Erro ao carregar o arquivo: ;
    }

    // Converte o conteúdo em texto e depois em objetos JavaScript
    const text = await response.text();
    const rawData = csvParse(text);

    // Garante que a coluna 'timestamp' está presente
    if (!("timestamp" in rawData[0])) {
      throw new Error("Coluna 'timestamp' não encontrada no CSV.");
    }

    const ipgData: { x: number; y: number }[] = [];

    // Calcula o IPG entre cada par de pacotes consecutivos
    for (let i = 1; i < rawData.length; i++) {
      const prev = parseFloat(rawData[i - 1]["timestamp"]);
      const curr = parseFloat(rawData[i]["timestamp"]);

      const ipg = curr - prev; // intervalo entre pacotes

      // Adiciona o IPG ao array apenas se for válido e dentro do limite
      if (!isNaN(ipg) && ipg >= 0 && ipg <= maxIPG) {
        ipgData.push({ x: i, y: ipg }); // x = índice do pacote, y = IPG
      }
    }

    // Reduz a quantidade de pontos se ultrapassar maxPoints (para performance)
    if (ipgData.length > maxPoints) {
      const step = Math.floor(ipgData.length / maxPoints);
      return ipgData.filter((_, i) => i % step === 0).slice(0, maxPoints);
    }

    return ipgData;
  } catch (error) {
    console.error("Erro ao processar IPG:", error);
    return [];
  }
}
`;
