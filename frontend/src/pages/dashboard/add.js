import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import CreateActivityForm from '@/components/CreateActivityForm'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

const Add = () => {
  const router = useRouter()
  const [types, setTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    const jwt = user?.accessToken
    const loadData = async () => {
      if (jwt) {
        const result = await fetchJson('/api/types/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jwt }),
        })
        setTypes(result.types)
        setIsLoading(false)
      }
    }
    if (router.isReady) {
      loadData().catch((error) => toast.error(error.message))
    }
  }, [user?.accessToken, router.isReady])

  return (
    <>
      {!isLoading ? (
        <>
          <Header title='Добавление активности' description='Добавление активности' />
          <CreateActivityForm types={types} />
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}

Add.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Add
