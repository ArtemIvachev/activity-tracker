import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/libs/session'

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req, res) {
  req.session.destroy()
  res.json({
    isLoggedIn: false,
    userData: undefined,
  })
}
