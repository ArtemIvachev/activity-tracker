import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(deleteActivityType, sessionOptions)

async function deleteActivityType(req, res) {
  const { typeId, jwt } = await req.body

  if (!typeId || !jwt) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activity/type/${typeId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${jwt}`,
    },
  })

  res.status(200).json({ message: 'ok' })
}
