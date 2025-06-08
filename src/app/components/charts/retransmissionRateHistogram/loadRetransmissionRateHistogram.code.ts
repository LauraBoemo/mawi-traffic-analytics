export const code = `
export async function loadRetransmissionRateHistogram(url: string): Promise<Array<{ bin: string; count: number }>> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao carregar o JSON')
    const data = await res.json()
    const map: Record<string, number> = data.taxa_retransmissoes || {}
    const values = Object.values(map).map(Number)
    if (values.length === 0) return []
    const min = Math.min(...values)
    const max = Math.max(...values)
    const bins = 5
    const width = (max - min) / bins || 1
    const counts = Array(bins).fill(0)
    values.forEach(v => {
      const idx = Math.min(bins - 1, Math.floor((v - min) / width))
      counts[idx]++
    })
    return counts.map((count, i) => {
      const start = (min + i * width).toFixed(2)
      const end = (min + (i + 1) * width).toFixed(2)
      return { bin: \`\${start}-\${end}\`, count }
    })
  } catch (e) {
    console.error('Erro ao carregar taxas de retransmissao:', e)
    return []
  }
}
`
