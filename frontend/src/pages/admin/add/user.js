import CreateUserForm from '@/components/CreateUserForm'
import Header from '@/components/Header'
import Layout from '@/components/Layout'

const AddUser = () => {
  return (
    <>
      <Header title='Создание' description='Создание пользователя' />
      <CreateUserForm />
    </>
  )
}

AddUser.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default AddUser
