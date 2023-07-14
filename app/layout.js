import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AuthProvider from "./context/AuthProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Twitter Clone',
  description: 'twitter clone made with next framework',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
