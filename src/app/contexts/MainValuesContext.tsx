// app/context/MainValuesContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'

export interface MainValues {
  url: string
  url_stats_metricas: string
  url_stats_completo: string
  maxPackets: number
  maxIPG: number
  binSize: number
  minPackets: number
  maxIPGPoints: number
  maxIPGValue: number
  maxPoints: number
}

const defaultValues: MainValues = {
  url: "https://raw.githubusercontent.com/DaviCMachado/T1_Redes/main/data.csv",
  url_stats_metricas: "https://raw.githubusercontent.com/DaviCMachado/T2_Redes/refs/heads/main/stats_metricas.json",
  url_stats_completo: "https://raw.githubusercontent.com/DaviCMachado/T2_Redes/refs/heads/main/stats_completo.json",
  maxPackets: 10000,
  maxIPG: 5,
  binSize: 1,
  minPackets: 1,
  maxIPGPoints: 10000,
  maxIPGValue: 5,
  maxPoints: 10000,
}

const MainValuesContext = createContext<{
  values: MainValues
  setValues: React.Dispatch<React.SetStateAction<MainValues>>
}>({
  values: defaultValues,
  setValues: () => {},
})

export const MainValuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<MainValues>(defaultValues)

  return (
    <MainValuesContext.Provider value={{ values, setValues }}>
      {children}
    </MainValuesContext.Provider>
  )
}

export const useMainValues = () => useContext(MainValuesContext)
