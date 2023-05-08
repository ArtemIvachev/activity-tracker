import { PlusCircleIcon, SparklesIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

function ActivityCard({ title, amount, unit, date, onClick }) {
  return (
    <div className='m-4 flex rounded-2xl bg-neutral p-4'>
      <div className='flex'>
        <SparklesIcon className='mr-4 mt-2 h-10 w-10 text-white' />
      </div>
      <div className='flex-1 flex-col'>
        <h4 className='text-lg font-bold text-white'>{title}</h4>
        <p className='mt-1 text-white'>
          {amount} {unit} • {date}
        </p>
      </div>
      <div className='flex'>
        <TrashIcon onClick={onClick} className='mr-4 mt-4 h-6 w-6 text-white hover:text-error' />
      </div>
    </div>
  )
}
export default function Activity({ activities }) {
  const { user } = useUser()
  const [realActivities, setRealActivities] = useState([])

  useEffect(() => {
    setRealActivities(activities)
  }, [activities])
  const deleteActivity = async (activityId) => {
    const jwt = user?.accessToken
    if (jwt) {
      await fetchJson('/api/activities/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId, jwt }),
      })
    }
    setRealActivities(realActivities.filter((activity) => activity.id !== activityId))
  }

  return (
    <div className='mb-8 mt-8 px-8'>
      <div className='items-left mb-4 flex flex-col'>
        <div className='mb-8 flex justify-between'>
          <h1 className='text-xl font-bold text-white'>Активности</h1>
          <Link href='/dashboard/add'>
            <PlusCircleIcon className='mt-2 h-6 w-6 text-white hover:text-accent-hover' />
          </Link>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {realActivities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={activity.activityType.name}
              amount={activity.amount}
              unit={activity.activityType.unit}
              date={activity.createdAt.split('T')[0]}
              onClick={() => deleteActivity(activity.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
