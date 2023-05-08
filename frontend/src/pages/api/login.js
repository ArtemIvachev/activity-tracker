import { withIronSessionApiRoute } from 'iron-session/next'
import jwt_decode from 'jwt-decode'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req, res) {
  const { accessToken } = await req.body.result
  const userData = jwt_decode(accessToken)

  try {
    req.session.user = {
      isLoggedIn: true,
      userData,
      accessToken,
    }
    await req.session.save()
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
