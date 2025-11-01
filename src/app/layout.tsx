import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = { title: 'WorldPeace DAO', description: 'BSC-only governance & donations' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
