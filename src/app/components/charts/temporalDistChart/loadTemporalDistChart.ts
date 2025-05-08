import { csvParse } from "d3-dsv";
import { binSize, maxPackets, url } from "../mainValues";

export async function loadTemporalDistributionByIP(): Promise<Array<Record<string, number>>> {
  /**
   * Agrupa pacotes em janelas de tempo por IP de origem,
   * normalizando os timestamps (segundos ou microssegundos) e aplicando rebase temporal.
   * 
   * Ideal para visualizações como heatmaps ou gráficos empilhados por IP ao longo do tempo.
   * 
   * @returns Array de objetos onde cada item representa uma janela de tempo e
   *          mapeia o IP de origem para a quantidade de pacotes naquela janela.
   *          Exemplo: { time: 3, "192.168.0.1": 5, "10.0.0.2": 2 }
  */
  try {
    // Requisição do CSV remoto
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
    }

    // Converte texto CSV para array de objetos (linhas)
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se colunas obrigatórias estão presentes
    if (!("timestamp" in rawData[0]) || !("src_ip" in rawData[0])) {
      throw new Error("CSV deve conter 'timestamp' e 'src_ip'.");
    }

    // Estrutura de bins agrupados por tempo, contendo contagens por IP
    const bins: Record<number, Record<string, number>> = {};
    let processed = 0;
    let baseTime: number | null = null;

    // Processa até maxPackets pacotes
    for (const row of rawData) {
      if (processed >= maxPackets) break;

      let ts = parseFloat(row["timestamp"]);
      const ip = row["src_ip"];
      if (!ip || isNaN(ts)) continue;

      // Corrige timestamps em microssegundos se necessário
      if (ts > 1e10) ts = ts / 1_000_000;

      // Define o tempo base como o timestamp do primeiro pacote
      if (baseTime === null) baseTime = ts;
      const relativeTime = ts - baseTime;

      // Calcula a janela de tempo (bin) onde o pacote se encaixa
      const timeBin = Math.floor(relativeTime / binSize);

      // Inicializa bin se necessário e registra a contagem para o IP
      if (!bins[timeBin]) {
        bins[timeBin] = { time: timeBin };
      }

      bins[timeBin][ip] = (bins[timeBin][ip] || 0) + 1;
      processed++;
    }

    // Converte os bins em array e ordena por tempo
    return Object.values(bins).sort((a, b) => a.time - b.time);
  } catch (error) {
    // Em caso de erro, loga e retorna array vazio
    console.error("Erro ao calcular distribuição temporal:", error);
    return [];
  }
}
