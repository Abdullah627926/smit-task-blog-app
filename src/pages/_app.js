import { AuthProvider } from '@/context'
import '@/styles/globals.css'
import { ConfigProvider } from "antd"

export default function App({ Component, props }) {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    </ConfigProvider >

  )
}
