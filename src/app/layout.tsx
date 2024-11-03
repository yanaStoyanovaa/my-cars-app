"use client"
import type { Metadata } from 'next'
import './globals.css'
import ReactQueryProvider from './ReactQueryProvider'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import {DataProvider} from './DataContext'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <DataProvider>
          <ReactQueryProvider>
            <div>{children}</div>
          </ReactQueryProvider>
          </DataProvider>
        </Theme>
      </body>
    </html>
  )
}
