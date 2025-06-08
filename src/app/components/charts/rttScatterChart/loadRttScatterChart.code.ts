export const code = `
export async function loadRttScatter(url: string): Promise<Array<{ idx: number; rtt: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map = data.rtt_por_conexao || {}
    const values = Array.isArray(map)
      ? map.map(([, r]: [string, number]) => Number(r))
      : Object.values(map).map(Number)
    return values.map((rtt, i) => ({ idx: i + 1, rtt }))
  } catch (e) {
    console.error('Erro ao carregar RTT scatter:', e)
    return []
  }
}
`
