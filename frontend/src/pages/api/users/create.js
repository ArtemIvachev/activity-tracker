import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(createUser, sessionOptions)

async function createUser(req, res) {
  const { username, email, role, password } = await req.body

  if (!username || !email || !role || !password) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ username, email, role, password }),
  })

  res.status(200).json({ message: 'ok' })
}
