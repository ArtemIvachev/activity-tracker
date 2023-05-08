import Link from 'next/link'

import AppHeader from '@/components/Head'
import { appDescription } from '@/constants/info'
import useUser from '@/libs/useUser'

export default function Default() {
  const { user } = useUser()

  return (
    <main>
      <AppHeader />
      <div className='hero min-h-screen bg-primary'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold text-base-100'>Activity Tracker</h1>
            <p className='py-6 font-light text-base-100'>{appDescription}</p>
            <Link href={user?.isLoggedIn ? '/dashboard/home' : '/login'} className='btn-accent btn'>
              Войти {user?.userData && `как ${user.userData.sub}`}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
