import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

/**
 * Soma o total de bytes transmitidos por IP de origem.
 * Retorna os IPs com os maiores volumes de dados.
 */
export async function loadBytesPerIP(
  maxPackets = 10000,
  topN = 10
): Promise<Array<{ ip: string; bytes: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o arquivo.");

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("src_ip" in rawData[0]) || !("length" in rawData[0])) {
      throw new Error("CSV deve conter as colunas 'src_ip' e 'length'.");
    }

    const byteMap: Record<string, number> = {};
    let processed = 0;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const ip = row["src_ip"];
      const length = parseInt(row["length"]);
      if (!ip || isNaN(length)) continue;

      byteMap[ip] = (byteMap[ip] || 0) + length;
      processed++;
    }

    return Object.entries(byteMap)
      .map(([ip, bytes]) => ({ ip, bytes }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, topN);
  } catch (error) {
    console.error("Erro ao calcular volume de bytes por IP:", error);
    return [];
  }
}
