import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

import { useTypes } from '../contexts/type'

export default function EditActivityTypeForm() {
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('')
  const { user } = useUser()
  const { typeIdToUpdate, setTypeIdToUpdate } = useTypes()
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const jwt = user?.accessToken
      if (jwt) {
        const result = await fetchJson(`/api/types/get/${typeIdToUpdate}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jwt }),
        })
        setName(result?.type?.name)
        setUnit(result?.type?.unit)
      }
    }
    loadData().catch((error) => toast.error(error.message))
  }, [typeIdToUpdate, user?.accessToken])
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleUnitChange = (e) => {
    setUnit(e.target.value)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const jwt = user?.accessToken
    const typeId = typeIdToUpdate
    await fetchJson('/api/types/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ typeId, name, unit, jwt }),
    })
    setTypeIdToUpdate(undefined)
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
          placeholder='Название типа активности'
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
            onClick={handleEdit}
            className='rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover'
          >
            Обновить
          </button>
        </div>
      </div>
    </div>
  )
}
