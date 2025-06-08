export const code = `
export async function loadCongestionWindow(url: string): Promise<Array<{ time: number; cwnd: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const cw = data.janela_congestionamento || {}
    const firstKey = Object.keys(cw)[0]
    if (!firstKey) return []
    const arr: [number, number][] = cw[firstKey]
    return arr.map(([t, v]) => ({ time: Number(t), cwnd: Number(v) }))
  } catch (e) {
    console.error('Erro ao carregar janela de congestionamento:', e)
    return []
  }
}
`
