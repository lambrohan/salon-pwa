import Cookie from 'js-cookie'
import { auth } from '~/plugins/firebase'

export default function (ctx) {
  auth.onAuthStateChanged((user) => {
    console.log('authStateChanged')
    ctx.store.dispatch('onAuthStateChangedAction', user)
  })

  auth.onIdTokenChanged(async (user) => {
    console.log('idTokenChanged')
    if (user && user.uid) {
      const idToken = await user.getIdToken()
      Cookie.set('Authorization', `${idToken}`, {
        expires: idToken ? 0.04166667 : 0,
      })
    } else {
      Cookie.remove('Authorization')
    }
  })
}
