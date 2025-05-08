import { csvParse } from "d3-dsv";
import { url } from "../mainValues";

export async function loadTrafficOverTime(
  binSize = 1, // segundos
  maxPackets = 10000
): Promise<Array<{ time: number; bytes: number }>> {
  /**
   * Calcula a quantidade total de bytes transmitidos ao longo do tempo,
   * agrupando os pacotes em janelas fixas de tempo (bins).
   * 
   * Útil para analisar picos de tráfego e variações no volume de dados ao longo do tempo.
   * 
   * @param binSize - Tamanho da janela de tempo, em segundos.
   * @param maxPackets - Número máximo de pacotes a serem processados.
   * @returns Array de objetos { time, bytes }, onde:
   *  - time: número da janela de tempo relativa ao início
   *  - bytes: soma dos tamanhos dos pacotes naquela janela
  */
  try {
    // Requisição e carregamento do CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o CSV.");

    // Conversão do texto CSV em array de objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se colunas obrigatórias estão presentes
    if (!("timestamp" in rawData[0]) || !("length" in rawData[0])) {
      throw new Error("CSV deve conter as colunas 'timestamp' e 'length'.");
    }

    const bins: Record<number, number> = {}; // Acumula bytes por janela de tempo
    let processed = 0;
    let baseTime: number | null = null; // Timestamp inicial usado como referência

    // Itera sobre os pacotes, agrupando por tempo e somando os bytes
    for (const row of rawData) {
      if (processed >= maxPackets) break;

      let ts = parseFloat(row["timestamp"]);
      const length = parseInt(row["length"]);

      if (isNaN(ts) || isNaN(length)) continue;

      // Converte microssegundos para segundos se necessário
      if (ts > 1e10) ts = ts / 1_000_000;
      if (baseTime === null) baseTime = ts;

      const relTime = ts - baseTime; // Tempo relativo ao primeiro pacote
      const bin = Math.floor(relTime / binSize); // Determina a janela de tempo

      // Soma os bytes na janela correspondente
      bins[bin] = (bins[bin] || 0) + length;
      processed++;
    }

    // Converte o objeto `bins` para array e ordena por tempo
    const result = Object.entries(bins)
      .map(([time, bytes]) => ({
        time: parseInt(time),
        bytes,
      }))
      .sort((a, b) => a.time - b.time);

    return result;
  } catch (error) {
    // Em caso de erro, loga no console e retorna array vazio
    console.error("Erro ao calcular tráfego por tempo:", error);
    return [];
  }
}
