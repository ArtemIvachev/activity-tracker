import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(createActivity, sessionOptions)

async function createActivity(req, res) {
  const { userId, activityTypeId, amount, createdAt, jwt } = await req.body

  if (!userId || !activityTypeId || !amount || !createdAt || !jwt) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activity`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ userId, activityTypeId, amount, createdAt }),
  })

  res.status(200).json({ message: 'ok' })
}
