import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '不動産FAX - インターネットFAXサービス',
  description: '不動産業界向けのシンプルなインターネットFAXサービス',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
