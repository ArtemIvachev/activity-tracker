import Head from 'next/head'
import React from 'react'

import { appDescription, appName } from '@/constants/info'

export default function AppHeader() {
  return (
    <Head>
      <title>{appName}</title>
      <meta name='description' content={appDescription} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:title' content={appName} />
      <meta property='og:site_name' content={appName} />
      <meta property='og:description' content={appDescription} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
