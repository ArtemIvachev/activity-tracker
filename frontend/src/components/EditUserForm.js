import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

import { useUsers } from '../contexts/user'

export default function EditUserForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState('')
  const { user } = useUser()
  const { userIdToUpdate, setUserIdToUpdate } = useUsers()
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const jwt = user?.accessToken
      if (jwt) {
        const result = await fetchJson(`/api/users/get/${userIdToUpdate}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jwt }),
        })
        console.log(result.user)
        setUsername(result?.user?.username)
        setEmail(result?.user?.email)
        if (result?.user?.roles) {
          setRoles(result?.user?.roles[0]?.name)
        }
      }
    }
    loadData().catch((error) => toast.error(error.message))
  }, [userIdToUpdate, user?.accessToken])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleRoleChange = (e) => {
    setRoles(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const jwt = user?.accessToken
    const userId = userIdToUpdate
    const role = [roles]
    await fetchJson('/api/users/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, username, email, role, jwt }),
    })
    setUserIdToUpdate(undefined)
    await router.push('/admin/home')
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='mr-36 mt-36 w-1/5 rounded-lg'>
        <input
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={handleEmailChange}
          placeholder='Email'
          className='mt-4 block w-full rounded-md bg-primary text-neutral focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
        <input
          id='username'
          name='username'
          type='text'
          value={username}
          onChange={handleUsernameChange}
          placeholder='Имя пользователя'
          className='mt-4 block w-full rounded-md bg-primary text-neutral focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
        <select
          id='role'
          name='role'
          placeholder='Роль'
          value={roles}
          onChange={handleRoleChange}
          className='mt-4 block w-full rounded-md bg-primary text-neutral focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        >
          <option key='ROLE_USER' value='ROLE_USER'>
            ROLE_USER
          </option>
          <option key='ROLE_ADMIN' value='ROLE_ADMIN'>
            ROLE_ADMIN
          </option>
        </select>
        <div className='flex items-center justify-center pt-4'>
          <button
            onClick={handleEdit}
            className='rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover'
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  )
}
