import { csvParse } from "d3-dsv";

export async function loadPacketSizeFrequency(
  url: string,
  maxPackets = 10000,
  binSize = 64 // bucket size em bytes
): Promise<Array<{ size: number; frequency: number }>> {
  /**
   * Calcula a frequência de ocorrência de cada faixa (bin) de tamanho de pacotes.
   * Útil para entender como os pacotes se distribuem em termos de tamanho (ex: muitos pequenos, poucos grandes).
   * 
   * @param maxPackets - Número máximo de pacotes a serem processados.
   * @param binSize - Tamanho dos intervalos (buckets) de agrupamento, em bytes.
   * @returns Um array de objetos { size, frequency } onde:
   *  - size: faixa de tamanho (bin) centralizada, múltiplo do `binSize`
   *  - frequency: número de pacotes que caem naquela faixa
  */
  try {
    // Requisição dos dados do arquivo CSV
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar o CSV.");

    // Converte o conteúdo em texto e depois em objetos
    const text = await response.text();
    const rawData = csvParse(text);

    // Verifica se a coluna 'length' existe
    if (!("length" in rawData[0])) {
      throw new Error("CSV deve conter a coluna 'length'.");
    }

    const freqMap: Record<number, number> = {}; // Frequência por bin
    let processed = 0;

    // Itera sobre os pacotes até o limite de maxPackets
    for (const row of rawData) {
      if (processed >= maxPackets) break;

      const size = parseInt(row["length"]);
      if (isNaN(size)) continue; // Ignora valores inválidos

      // Arredonda o tamanho para o bin mais próximo (por exemplo, 130 → 128)
      const bin = Math.round(size / binSize) * binSize;

      // Atualiza a contagem de pacotes nesse bin
      freqMap[bin] = (freqMap[bin] || 0) + 1;
      processed++;
    }

    // Converte o mapa em array e ordena por tamanho crescente
    return Object.entries(freqMap)
      .map(([size, frequency]) => ({
        size: parseInt(size),
        frequency,
      }))
      .sort((a, b) => a.size - b.size);
  } catch (error) {
    // Em caso de erro, retorna array vazio e loga no console
    console.error("Erro ao calcular frequência de tamanho de pacotes:", error);
    return [];
  }
}
