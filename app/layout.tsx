import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Terminal Portfolio',
  description: 'A terminal-style cybersecurity portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#050505] text-[#E5E7EB] font-mono m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}