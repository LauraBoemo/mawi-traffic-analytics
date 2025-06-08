export async function loadRetransmissions(url: string): Promise<Array<{ ip: string; count: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.taxa_retransmissoes || {}
    return Object.entries(map).map(([ip, count]) => ({ ip, count: Number(count) }))
  } catch (e) {
    console.error('Erro ao carregar retransmissões:', e)
    return []
  }
}
