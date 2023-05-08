import { useRouter } from 'next/router'
import { useState } from 'react'

import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

export default function CreateActivityTypeForm() {
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const { user } = useUser()
  const router = useRouter()

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleUnitChange = (e) => {
    setUnit(e.target.value)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const jwt = user?.accessToken
    await fetchJson('/api/types/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, unit, jwt }),
    })
    await router.push('/admin/home')
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='mr-36 mt-36 w-1/5 rounded-lg'>
        <input
          id='name'
          name='name'
          type='text'
          value={name}
          onChange={handleNameChange}
          placeholder='Название активности'
          className='mt-4 block w-full rounded-md bg-primary text-neutral focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
        <input
          id='unit'
          name='unit'
          type='text'
          value={unit}
          onChange={handleUnitChange}
          placeholder='Единица измерения'
          className='mt-4 block w-full rounded-md bg-primary text-neutral focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
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
