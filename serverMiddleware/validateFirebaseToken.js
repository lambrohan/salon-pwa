import Cookies from 'cookies'
import jwt_decode from 'jwt-decode'

export default (req, res, next) => {
  const staticRoute = /\/_nuxt\/*/g
  if (req.url.match(staticRoute)) return next()

  getIdTokenFromRequest(req, res).then((idToken) => {
    if (idToken) {
      const decodedToken = jwt_decode(idToken)
      req.user = decodedToken
      req.idToken = idToken
    }
  })
  next()
}
function getIdTokenFromRequest(req, res) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // console.log('Found "Authorization" header')
    // Read the ID Token from the Authorization header.
    return Promise.resolve(req.headers.authorization.split('Bearer ')[1])
  }
  return new Promise((resolve) => {
    const cookie = new Cookies(req, res)
    if (typeof cookie.get('Authorization') !== 'undefined') {
      resolve(cookie.get('Authorization'))
    } else {
      resolve()
    }
  })
}
