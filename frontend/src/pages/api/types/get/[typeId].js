import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(getTypeById, sessionOptions)

async function getTypeById(req, res) {
  const { jwt } = await req.body
  const { typeId } = await req.query

  if (!jwt || !typeId) {
    return res.status(400).json({ message: 'Неверный запрос' })
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activity/type/${typeId}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwt}`,
      },
    },
  )
  const type = await response.json()

  res.status(200).json({ type: type })
}
