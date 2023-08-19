
import { Inter } from 'next/font/google'
import SignUpPage from './auth/signup'
import AuthGuard from '@/guard'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <AuthGuard>
      <SignUpPage />
    </AuthGuard>

  )
}
