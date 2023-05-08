import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'

import { sessionOptions } from '@/libs/session'

export const middleware = async (request) => {
  const response = NextResponse.next()
  const session = await getIronSession(request, response, sessionOptions)

  const { user } = session
  if (!user?.userData) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}
