export const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: 'activity-tracker-ippo',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
