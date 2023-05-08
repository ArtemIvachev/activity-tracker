import Link from 'next/link'
import { useEffect, useState } from 'react'

import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

import { useTypes } from '../contexts/type'

export default function ActivityTypesTable({ types }) {
  const { user } = useUser()
  const [realTypes, setRealTypes] = useState([])
  const { setTypeIdToUpdate } = useTypes()

  useEffect(() => {
    setRealTypes(types)
  }, [types])

  const deleteType = async (typeId) => {
    const jwt = user?.accessToken
    if (jwt) {
      await fetchJson('/api/types/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeId, jwt }),
      })
    }
    setRealTypes(realTypes.filter((type) => type.id !== typeId))
  }

  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Название
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Едининица измерения
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {realTypes.map((type) => (
                  <tr key={type.id}>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                      {type.name}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                      {type.unit}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                      <Link
                        href={`/admin/edit/type/${type.id}`}
                        onClick={() => setTypeIdToUpdate(type.id)}
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                      <div
                        onClick={() => deleteType(type.id)}
                        className='cursor-pointer text-indigo-600 hover:text-indigo-900'
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
