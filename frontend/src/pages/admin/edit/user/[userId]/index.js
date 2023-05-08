import { useRouter } from 'next/router'
import { useState } from 'react'

import EditUserForm from '@/components/EditUserForm'
import Header from '@/components/Header'
import Layout from '@/components/Layout'

const EditUser = () => {
  const router = useRouter()
  const { userId } = router.query
  return (
    <>
      <Header title='Редактирование' description={'Редактирование пользователя ' + userId} />
      <EditUserForm />
    </>
  )
}

EditUser.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default EditUser
