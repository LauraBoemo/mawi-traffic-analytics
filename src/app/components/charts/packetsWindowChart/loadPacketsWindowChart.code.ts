export const code = `
import { csvParse } from "d3-dsv";

export async function loadPacketsPerWindow(
  url: string,
  binSize = 10,
  maxPoints = 10000
): Promise<Array<{ window: string; count: number }>> {
  /**
   * Agrupa pacotes em janelas de tempo fixas e conta quantos pacotes caem em cada janela.
   * Retorna um array de objetos formatados para visualização em BarChart.
   * 
   * @param binSize - Duração de cada janela de tempo (em segundos).
   * @returns Um array com objetos { window, count } onde:
   *  - window: intervalo de tempo formatado como "MM:SS-MM:SS"
   *  - count: quantidade de pacotes naquela janela
  */
  try {
    // Faz a requisição para carregar o CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(Erro ao carregar o arquivo: ;
    }

    // Converte o conteúdo em texto e depois em array de objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se a coluna de timestamp está presente
    if (!("timestamp" in rawData[0])) {
      throw new Error("Coluna 'timestamp' não encontrada no CSV.");
    }

    const bins: Record<number, number> = {}; // Armazena contagem de pacotes por bin
    let processed = 0;
    let baseTime: number | null = null;

    // Processa os pacotes e agrupa por janelas de tempo
    for (const row of rawData) {
      if (processed >= 10000) break;

      let ts = parseFloat(row["timestamp"]);
      if (isNaN(ts)) continue;

      // Corrige timestamp se estiver em microssegundos
      if (ts > 1e10) ts = ts / 1_000_000;

      // Define o timestamp inicial como referência
      if (baseTime === null) baseTime = ts;
      const relativeTime = ts - baseTime;

      const binIndex = Math.floor(relativeTime / binSize); // Identifica o bin
      bins[binIndex] = (bins[binIndex] || 0) + 1; // Incrementa a contagem

      processed++;
    }

    // Converte os bins em array formatado para visualização
    const result = Object.entries(bins)
      .map(([binStr, count]) => {
        const bin = parseInt(binStr, 10);
        const start = bin * binSize;
        const end = (bin + 1) * binSize;

        // Formata segundos para "MM:SS"
        const format = (s: number) => {
          const min = Math.floor(s / 60).toString().padStart(2, "0");
          const sec = Math.floor(s % 60).toString().padStart(2, "0");
          return;
        };

        return {
          window: ,
          count,
        };
      })
      .sort((a, b) => a.window.localeCompare(b.window)); // Ordena cronologicamente

    // Reduz número de pontos para manter legibilidade
    if (result.length > maxPoints) {
      const step = Math.floor(result.length / maxPoints);
      return result.filter((_, i) => i % step === 0).slice(0, maxPoints);
    }

    return result;
  } catch (error) {
    console.error("Erro ao agrupar pacotes por janela de tempo:", error);
    return [];
  }
}
`;
