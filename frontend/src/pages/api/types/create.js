import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(createActivityType, sessionOptions)

async function createActivityType(req, res) {
  const { name, unit, jwt } = await req.body

  if (!name || !unit || !jwt) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activity/type`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, unit }),
  })

  res.status(200).json({ message: 'ok' })
}
