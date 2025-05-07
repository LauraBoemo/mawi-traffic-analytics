import { csvParse } from "d3-dsv";
import { maxIPG, maxPoints, url } from "../mainValues";

/**
 * Carrega e processa dados de timestamp para gerar IPG (Inter-Packet Gap).
 */
export async function loadAndProcessIPGData(): Promise<Array<{ x: number; y: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });;
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se coluna timestamp existe
    if (!("timestamp" in rawData[0])) {
      throw new Error("Coluna 'timestamp' não encontrada no CSV.");
    }

    const ipgData: { x: number; y: number }[] = [];

    for (let i = 1; i < rawData.length; i++) {
      const prev = parseFloat(rawData[i - 1]["timestamp"]);
      const curr = parseFloat(rawData[i]["timestamp"]);

      const ipg = curr - prev;

      if (!isNaN(ipg) && ipg >= 0 && ipg <= maxIPG) {
        ipgData.push({ x: i, y: ipg });
      }
    }

    // Redução de pontos, se necessário
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
