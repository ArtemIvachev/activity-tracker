import '@/styles/globals.css'

import { SWRConfig } from 'swr'

import fetchJson from '@/libs/fetchJson'

import { TypeProvider } from '../contexts/type'
import { UserProvider } from '../contexts/user'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <UserProvider>
      <TypeProvider>
        <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              console.error(err)
            },
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
      </TypeProvider>
    </UserProvider>
  )
}
