import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(deleteActivity, sessionOptions)

async function deleteActivity(req, res) {
  const { activityId, jwt } = await req.body

  if (!activityId || !jwt) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activity/${activityId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${jwt}`,
    },
  })

  res.status(200).json({ message: 'ok' })
}
