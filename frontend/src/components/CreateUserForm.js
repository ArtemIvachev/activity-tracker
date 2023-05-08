import { useRouter } from 'next/router'
import { useState } from 'react'

import fetchJson from '@/libs/fetchJson'

export default function CreateUserForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState('')
  const router = useRouter()
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRoleChange = (e) => {
    setRoles(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const role = [roles]
    await fetchJson('/api/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, role, password }),
    })
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
        <input
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
          placeholder='Пароль'
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
            onClick={handleCreate}
            className='rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover'
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
