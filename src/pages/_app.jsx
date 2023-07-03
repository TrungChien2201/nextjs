import '@/styles/globals.scss'
import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fallback: pageProps.fallback || {} }}>
      <Component {...pageProps} />
      <ToastContainer />
    </SWRConfig>
  )
}

export default App
