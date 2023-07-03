import '@/styles/globals.scss'
import { SWRConfig } from 'swr'

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fallback: pageProps.fallback || {} }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App
