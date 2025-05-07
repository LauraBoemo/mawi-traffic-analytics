import { csvParse } from "d3-dsv";
import { url, maxIPG } from "../mainValues";

/**
 * Calcula o IPG médio e o desvio padrão dos envios de pacotes por IP.
 */
export async function loadAvgIPGPerIP(
  maxPackets = 10000
): Promise<Array<{ ip: string; avg: number; std: number }>> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o arquivo.");

    const text = await response.text();
    const rawData = csvParse(text);

    if (!("timestamp" in rawData[0]) || !("src_ip" in rawData[0])) {
      throw new Error("CSV deve conter as colunas 'timestamp' e 'src_ip'.");
    }

    const ipMap: Record<string, number[]> = {};
    let processed = 0;

    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const ts = parseFloat(row["timestamp"]);
      const ip = row["src_ip"];
      if (!ip || isNaN(ts)) continue;

      ipMap[ip] = ipMap[ip] || [];
      ipMap[ip].push(ts);
      processed++;
    }

    const result: { ip: string; avg: number; std: number }[] = [];

    for (const [ip, timestamps] of Object.entries(ipMap)) {
      if (timestamps.length < 2) continue;

      const sorted = timestamps.sort((a, b) => a - b);
      const ipgs = [];

      for (let i = 1; i < sorted.length; i++) {
        let gap = sorted[i] - sorted[i - 1];
        if (gap > 1e10) gap /= 1_000_000; // microssegundos
        if (gap >= 0 && gap <= maxIPG) ipgs.push(gap);
      }

      if (ipgs.length === 0) continue;

      const n = ipgs.length;
      const mean = ipgs.reduce((a, b) => a + b, 0) / n;
      const variance = ipgs.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;
      const std = Math.sqrt(variance);

      result.push({
        ip,
        avg: parseFloat(mean.toFixed(2)),
        std: parseFloat(std.toFixed(2)),
      });
    }

    return result.sort((a, b) => b.avg - a.avg).slice(0, 10); // top 10 IPs com maior IPG médio
  } catch (error) {
    console.error("Erro ao calcular IPG por IP:", error);
    return [];
  }
}
