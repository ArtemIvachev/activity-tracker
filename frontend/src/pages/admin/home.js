import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import ActivityTypesTable from '@/components/ActivityTypesTable'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import UsersTable from '@/components/UsersTable'
import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

const AdminHome = () => {
  const [users, setUsers] = useState([])
  const [types, setTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    const jwt = user?.accessToken
    const loadData = async () => {
      if (jwt) {
        const usersData = await fetchJson('/api/users/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jwt }),
        })
        const typeData = await fetchJson('/api/types/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jwt }),
        })
        setUsers(usersData.users)
        setTypes(typeData.types)
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
          <Header title='Панель управления' description='Администрирование приложения' />
          <div className='mb-8 mt-8 px-8'>
            <div className='items-left mb-4 flex flex-col'>
              <div className='mb-8 flex justify-between'>
                <h1 className='text-xl font-bold text-white'>Пользователи</h1>
                <Link href='/admin/add/user'>
                  <PlusCircleIcon className='mt-2 h-6 w-6 text-white hover:text-accent-hover' />
                </Link>
              </div>
              <div className='flex items-center justify-center'>
                <UsersTable users={users} />
              </div>
            </div>
            <div className='items-left mb-4 flex flex-col'>
              <div className='mb-8 flex justify-between'>
                <h1 className='text-xl font-bold text-white'>Типы активностей</h1>
                <Link href='/admin/add/type'>
                  <PlusCircleIcon className='mt-2 h-6 w-6 text-white hover:text-accent-hover' />
                </Link>
              </div>
              <div className='flex items-center justify-center'>
                <ActivityTypesTable types={types} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}

AdminHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default AdminHome
