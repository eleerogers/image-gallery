import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { Inter } from 'next/font/google'
import { Container, SSRProvider } from '@/components/bootstrap'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Image Gallery',
  description: 'Using NextJS 13.4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SSRProvider>
          <main>
            <Container className="py-4">
              {children}
            </Container>
          </main>
        </SSRProvider>
      </body>
    </html>
  )
}
