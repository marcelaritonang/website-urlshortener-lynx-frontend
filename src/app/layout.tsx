import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lynx - URL Shortener & QR Generator',
  description: 'Transform your links into powerful insights with Lynx',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}