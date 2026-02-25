import "./globals.css"
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Provider } from "./Provider"

const _geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Armour Tech Solutions',
  description: 'We Build scalable applications using the latest technology',
  generator: 'Armour Devs',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.className} antialiased`} suppressHydrationWarning>
        
          <Provider>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
          </Provider>
  
      </body>
    </html>
  )
}
