import { csvParse } from "d3-dsv";

export async function loadAvgIPGPerIP(
  url: string,
  maxIPG: number,
  maxPackets = 100000
): Promise<Array<{ ip: string; avg: number; std: number }>> {
  /**
   * Calcula o IPG médio (Inter-Packet Gap) e o desvio padrão por IP de origem.
   * 
   * Essa análise mostra quanto tempo, em média, cada IP leva entre envios consecutivos,
   * podendo revelar padrões de uso ou comportamentos anômalos.
   * 
   * @param maxPackets - Limite de pacotes a processar do CSV.
   * @returns Array com os 100 IPs que possuem os maiores IPGs médios,
   *          incluindo o desvio padrão de cada um.
  */
  try {
    // Requisição para carregar os dados do CSV
    const response = await fetch(url, { cache: "no-store" });
    console.log(response);
    if (!response.ok) throw new Error("Erro ao carregar o arquivo.");

    const text = await response.text();
    const rawData = csvParse(text);

    // Garante que colunas obrigatórias estão presentes
    if (!("timestamp" in rawData[0]) || !("src_ip" in rawData[0])) {
      throw new Error("CSV deve conter as colunas 'timestamp' e 'src_ip'.");
    }

    const ipMap: Record<string, number[]> = {}; // Mapeia IPs aos seus timestamps
    let processed = 0;

    // Agrupa timestamps por IP de origem
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

    // Para cada IP, calcula os IPGs e suas estatísticas
    for (const [ip, timestamps] of Object.entries(ipMap)) {
      if (timestamps.length < 2) continue;

      const sorted = timestamps.sort((a, b) => a - b); // Ordena os timestamps
      const ipgs = [];

      // Calcula os gaps entre pacotes consecutivos
      for (let i = 1; i < sorted.length; i++) {
        let gap = sorted[i] - sorted[i - 1];
        if (gap > 1e100) gap /= 1_000_000; // Corrige microssegundos se necessário
        if (gap >= 0 && gap <= maxIPG) ipgs.push(gap);
      }

      if (ipgs.length === 0) continue;

      // Calcula média e desvio padrão dos IPGs
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

    // Retorna os 100 IPs com maior IPG médio
    return result.sort((a, b) => b.avg - a.avg).slice(0, 100);
  } catch (error) {
    console.error("Erro ao calcular IPG por IP:", error);
    return [];
  }
}
