import Link from 'next/link'
import { useEffect, useState } from 'react'

import fetchJson from '@/libs/fetchJson'
import useUser from '@/libs/useUser'

import { useUsers } from '../contexts/user'

export default function UsersTable({ users }) {
  const { user } = useUser()
  const [realUsers, setRealUsers] = useState([])
  const { setUserIdToUpdate } = useUsers()

  useEffect(() => {
    setRealUsers(users)
  }, [users])
  const deleteUser = async (userId) => {
    const jwt = user?.accessToken
    if (jwt) {
      await fetchJson('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, jwt }),
      })
    }
    setRealUsers(realUsers.filter((user) => user.id !== userId))
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
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Имя пользователя
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Роль
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Активности
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
                {realUsers.map((user) => (
                  <tr key={user.id}>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                      {user.email}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                      {user.username}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                      {user.roles[0]?.name}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                      {user.activities.length} штук
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                      <Link
                        href={`/admin/edit/user/${user.id}`}
                        onClick={() => setUserIdToUpdate(user.id)}
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit
                      </Link>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                      <div
                        onClick={() => deleteUser(user.id)}
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
