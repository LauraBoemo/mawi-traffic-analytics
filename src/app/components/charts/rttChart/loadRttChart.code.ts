export const code = `
export async function loadRttPerConnection(url: string): Promise<Array<{ id: string; rtt: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.rtt_por_conexao || {}
    return Object.entries(map).map(([id, rtt]) => ({ id, rtt: Number(rtt) }))
  } catch (e) {
    console.error('Erro ao carregar RTT:', e)
    return []
  }
}
`
