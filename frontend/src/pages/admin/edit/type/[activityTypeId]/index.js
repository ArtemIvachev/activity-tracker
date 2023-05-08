import { useRouter } from 'next/router'
import { useState } from 'react'

import EditActivityTypeForm from '@/components/EditActivityTypeForm'
import Header from '@/components/Header'
import Layout from '@/components/Layout'

const EditUser = () => {
  const router = useRouter()
  const { activityTypeId } = router.query
  return (
    <>
      <Header
        title='Редактирование'
        description={'Редактирование типа активности ' + activityTypeId}
      />
      <EditActivityTypeForm />
    </>
  )
}

EditUser.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default EditUser
