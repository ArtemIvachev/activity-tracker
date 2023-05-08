import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  HomeIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

import AppHeader from '@/components/Head'
import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

const navigation = [
  {
    name: 'Главная',
    href: '/dashboard/home',
    icon: HomeIcon,
    current: true,
  },
  {
    name: 'Добавление активности',
    href: '/dashboard/add',
    icon: PencilIcon,
  },
]

const adminNavigation = [
  {
    name: 'Админ.панель',
    href: '/admin/home',
    icon: Cog8ToothIcon,
  },
]

function formatNavigation(navigation) {
  return navigation.map((item) => (
    <a key={item.name} href={item.href}>
      <item.icon
        className={classNames(
          item.current ? 'text-accent' : 'text-white hover:text-accent-hover',
          'mb-4 h-6 w-6',
        )}
        aria-hidden='true'
      />
    </a>
  ))
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout(props) {
  const router = useRouter()
  const [isSuperuser, setSuperuser] = useState(false)

  const { mutateUser, user } = useUser()

  useEffect(() => {
    if (user?.userData) {
      const fetchSuperuser = async () => {
        setSuperuser(user?.userData?.role === '[ROLE_ADMIN]')
      }
      fetchSuperuser().catch((error) => toast.error(error.message))
    }
  }, [user?.userData])

  navigation.forEach((item) => {
    item.current = router.pathname === item.href
  })
  adminNavigation.forEach((item) => {
    item.current = router.pathname === item.href
  })

  async function logout(event) {
    event.preventDefault()
    await mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
    await router.push('/login')
  }

  return (
    <>
      <AppHeader />
      <div className='flex h-full w-full items-center bg-primary'>
        <div className='h-screen w-24 bg-secondary'>
          <div className='flex h-full flex-col items-center justify-between p-4'>
            <Image
              src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              width={48}
              height={48}
              alt='Avatar'
              className={'mt-4 h-10 w-10 rounded-full'}
            />

            <div className='flex flex-col items-center justify-center'>
              {formatNavigation(navigation)}
              {isSuperuser && formatNavigation(adminNavigation)}
            </div>
            <div onClick={logout} className='group flex items-center px-2 py-2'>
              <ArrowLeftOnRectangleIcon
                className='mb-4 h-6 w-6 text-white hover:text-accent-hover'
                aria-hidden='true'
              />
            </div>
          </div>
        </div>
        <div className='h-screen w-full overflow-y-auto bg-primary'>
          {props.children}
          <Toaster position='bottom-right' />
        </div>
      </div>
    </>
  )
}
