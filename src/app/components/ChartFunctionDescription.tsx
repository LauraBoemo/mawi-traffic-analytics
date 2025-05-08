'use client'

import React from 'react'
import { Paper } from '@mui/material'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// Registra a linguagem TSX (usa TypeScript como base)
SyntaxHighlighter.registerLanguage('tsx', ts)

const ChartFunctionDescription = ({
  children,
  language = 'tsx',
}: {
  children: string
  language?: string
}) => (
  <Paper
    variant="outlined"
    sx={{
      backgroundColor: '#272822', // fundo do monokai
      borderRadius: 2,
      padding: 2.5,
      overflowX: 'auto',
      margin: 2,
      lineBreak: "anywhere"
    }}
  >
    <SyntaxHighlighter
      language={language}
      style={monokai}
      customStyle={{
        background: 'transparent',
        fontSize: '0.875rem',
        fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace',
        margin: 0,
        padding: 0,
        lineHeight: '1.6',
      }}
      wrapLongLines
    >
      {children}
    </SyntaxHighlighter>
  </Paper>
)

export default ChartFunctionDescription
