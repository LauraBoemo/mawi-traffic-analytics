'use client'

import { Box, Divider, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Descrição', path: '/descricoes' },
  { label: 'Dados Não-Triviais', path: '/nao-triviais' },
  { label: 'Métricas', path: '/metricas' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: 240,
          padding: 2,
          backgroundColor: '#f7f7f7',
          border: 0,
          fontFamily: 'var(--font-geist-mono)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box display="flex" flexDirection="column" gap="20px">
        <header>
          <h1>
            Mawi Traffic Analytics
          </h1>
        </header>
        <Divider />
        <List>
          {navItems.map(({ label, path }) => (
            <Link key={path} href={path} passHref>
              <ListItemButton selected={pathname === path}>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '14px',
                      fontFamily: 'var(--font-geist-mono)',
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
      <Box display="flex" flexDirection="column" gap="20px">
        <Divider />
        <footer>
          <h6>
            Davi, Giovana, João & Laura
          </h6>
          <h6 style={{ fontWeight: 500 }}>
            Redes de Computadores
          </h6>
          <h6 style={{ fontWeight: 200 }}>
            UFSM, 2025/01
          </h6>
        </footer>
      </Box>
    </Drawer>
  )
}
