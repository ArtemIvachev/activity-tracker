import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(getUserById, sessionOptions)

async function getUserById(req, res) {
  const { jwt } = await req.body
  const { userId } = await req.query

  if (!jwt || !userId) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${jwt}`,
    },
  })
  const user = await response.json()

  res.status(200).json({ user: user })
}
