import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

export default function CreateActivityForm({ types }) {
  const [selectedType, setSelectedType] = useState(types[0]?.id)
  const [created, setCreated] = useState(new Date().toISOString())
  const [amount, setAmount] = useState(0)
  const { user } = useUser()
  const router = useRouter()

  const handleAmountChange = (e) => {
    setAmount(parseInt(e.target.value))
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

  const handleDateChange = (e) => {
    setCreated(e.target.value)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const jwt = user?.accessToken
    const userId = user?.userData?.id
    const activityTypeId = selectedType
    const createdAt = new Date(created).toISOString()
    await fetchJson('/api/activities/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, activityTypeId, amount, createdAt, jwt }),
    })
    await router.push('/dashboard/home')
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='mr-36 mt-36 w-1/5 rounded-lg'>
        <select
          id='type'
          name='type'
          value={selectedType === null ? 'Выберите тип активности' : selectedType.name}
          onChange={handleTypeChange}
          placeholder='Тип активности'
          className='block w-full rounded-md bg-primary text-neutral focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        >
          {types?.map((type, index) => (
            <option key={index} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          id='amount'
          name='amount'
          type='number'
          value={amount}
          onChange={handleAmountChange}
          placeholder='Количество'
          className='mt-4 block w-full rounded-md bg-primary text-neutral focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
        <input
          id='created'
          name='created'
          type='date'
          value={created}
          onChange={handleDateChange}
          placeholder='Дата'
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
