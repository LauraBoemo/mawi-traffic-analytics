export async function loadHandshakeCdf(
  url: string,
  maxEntries = 10000
): Promise<Array<{ time: number; cdf: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const arr: number[] = data.tempos_estabelecimento || []
    const times = arr.map(Number).sort((a, b) => a - b)
    const total = times.length
    return times
      .slice(0, maxEntries)
      .map((time, i) => ({ time, cdf: parseFloat(((i + 1) / total).toFixed(4)) }))
  } catch (e) {
    console.error('Erro ao carregar tempos de handshake:', e)
    return []
  }
}
