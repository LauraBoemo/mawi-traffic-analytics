'use client'

import { Box, Divider, Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const trab1NavItems = [
  { label: 'Descrição', path: '/t1-descricoes' },
  { label: 'Dados Não-Triviais', path: '/t1-nao-triviais' },
  { label: 'Métricas', path: '/t1-metricas' },
]

const trab2NavItems = [
  { label: 'Descrição', path: '/t2-descricoes' },
  { label: 'Métricas', path: '/t2-metricas' },
  { label: 'Gráficos', path: '/t2-graficos' },
]

const Header = () => {
  return (
    <header>
      <h1>
        Mawi Traffic Analytics
      </h1>
    </header>
  )
}

const Footer = () => {
  return (
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
  )
}

const RouteLink = ({ path, label, pathname }: { path: string; label: string; pathname: string }) => {
  return (
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
  )
}

type NavItem = { label: string; path: string };

const Section = ({ title, navItems, pathname }: { title: string; navItems: NavItem[]; pathname: string }) => {
  return (
    <Box>
      <h6>
        {title}
      </h6>
      <List>
        {navItems.map(({ label, path }: NavItem) => (
          <RouteLink key={path} label={label} path={path} pathname={pathname} />
        ))}
      </List>
    </Box>
  )
}

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
        <Header />
        <Divider />
        <Section title='Trabalho 01' navItems={trab1NavItems} pathname={pathname} />
        <Divider />
        <Section title='Trabalho 02' navItems={trab2NavItems} pathname={pathname} />
      </Box>
      <Footer />
    </Drawer>
  )
}
