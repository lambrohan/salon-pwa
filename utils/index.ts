import jwtDecode from 'jwt-decode'
import Cookies from 'cookies'
export * from './enums'

export const CANCELLATION_REASONS = [
  'user did not reach in time',
  'stylist is not available',
]

export const getAuthTokenFromReq = (req: any, res: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    const token = req.headers.authorization.split('Bearer ')[1]
    req.user = jwtDecode(token)
    return token
  }

  const cookie = new Cookies(req, res)
  if (typeof cookie.get('Authorization') !== 'undefined') {
    return cookie.get('Authorization')
  }

  return false
}
