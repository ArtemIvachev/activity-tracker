import CreateActivityTypeForm from '@/components/CreateActivityTypeForm'
import Header from '@/components/Header'
import Layout from '@/components/Layout'

const AddActivityType = () => {
  return (
    <>
      <Header title='Создание' description='Создание типа активности' />
      <CreateActivityTypeForm />
    </>
  )
}

AddActivityType.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default AddActivityType
