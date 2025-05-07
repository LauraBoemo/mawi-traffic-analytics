import { csvParse } from "d3-dsv";
import { url, maxPackets, minPackets } from "../mainValues";

/**
 * Calcula o tamanho médio dos pacotes enviados por IP de origem.
 * Processa no máximo 10.000 pacotes para evitar sobrecarga.
 */
export async function loadAvgPacketSizeByIP(): Promise<Array<{ ip: string; size: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });;
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    const text = await response.text();
    const rawData = csvParse(text);

    const ipStats: Record<string, { total: number; count: number }> = {};
    let processed = 0;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const ip = row["src_ip"];
      const length = parseInt(row["length"]);

      if (!ip || isNaN(length)) continue;

      if (!ipStats[ip]) {
        ipStats[ip] = { total: 0, count: 0 };
      }

      ipStats[ip].total += length;
      ipStats[ip].count += 1;
      processed++;
    }

    const result = Object.entries(ipStats)
      .filter(([, stats]) => stats.count >= minPackets)
      .map(([ip, stats]) => ({
        ip,
        size: parseFloat((stats.total / stats.count).toFixed(2)), // média com 2 casas
      }));

    return result;
  } catch (error) {
    console.error("Erro ao calcular tamanho médio por IP:", error);
    return [];
  }
}
