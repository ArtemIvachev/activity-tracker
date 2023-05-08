import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(updateUser, sessionOptions)

async function updateUser(req, res) {
  const { userId, username, email, role, jwt } = await req.body

  if (!userId || !username || !email || !role || !jwt) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ username, email, role }),
  })

  res.status(200).json({ message: 'ok' })
}
