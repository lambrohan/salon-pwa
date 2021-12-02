import Cookie from 'js-cookie'
import { auth } from '~/plugins/firebase'

export default function (ctx) {
  auth.onAuthStateChanged((user) => {
    ctx.store.dispatch('onAuthStateChangedAction', {
      uid: user.uid,
      phone_number: user.phoneNumber,
    })
  })

  auth.onIdTokenChanged(async (user) => {
    console.log('idTokenChanged')
    if (user && user.uid) {
      const idToken = await user.getIdToken()
      ctx.$axios.setToken(idToken, 'bearer')
      ctx.store.dispatch('getUser', user.uid)

      Cookie.set('Authorization', `${idToken}`, {
        expires: idToken ? 0.04166667 : 0,
      })
      window.localStorage.setItem('jwt', idToken)
    } else {
      Cookie.remove('Authorization')
    }
  })
}
