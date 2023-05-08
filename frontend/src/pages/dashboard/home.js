import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import Activity from '@/components/Activity'
import Header from '@/components/Header'
import Info from '@/components/Info'
import Layout from '@/components/Layout'
import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

const Home = () => {
  const router = useRouter()
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    const jwt = user?.accessToken
    const loadData = async () => {
      if (jwt) {
        const result = await fetchJson('/api/users/me', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jwt }),
        })
        setActivities(result.user.activities)
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
          <Header
            title={`Добрый день, ${user?.userData?.sub}`}
            description='Добро пожаловать на сайт ARTFitness! Окунитесь в атмосферу спорта!
            Здесь вы можете назначать себе тренировки и, тем самым, отслеживать свои результаты!'
          />
          <Info />
          <Activity activities={activities} />
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Home
