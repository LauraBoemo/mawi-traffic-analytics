export const code = `
export async function loadHandshakeTimes(
  url: string,
  maxEntries = 10000
): Promise<Array<{ idx: number; time: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const arr: number[] = data.tempos_estabelecimento || []
    return arr
      .slice(0, maxEntries)
      .map((t, i) => ({ idx: i + 1, time: Number(t) }))
  } catch (e) {
    console.error('Erro ao carregar tempos de handshake:', e)
    return []
  }
}
`
