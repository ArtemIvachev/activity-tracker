import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(getActivityTypes, sessionOptions)

async function getActivityTypes(req, res) {
  const { jwt } = await req.body

  if (!jwt) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activity/type`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${jwt}`,
    },
  })
  const types = await response.json()

  res.status(200).json({ types: types })
}
