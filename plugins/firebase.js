import { getApps, initializeApp } from '@firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'

export default (ctx) => {
  const firebaseConfig = {
    apiKey: ctx.$config.apiKey,
    authDomain: ctx.$config.authDomain,
    projectId: ctx.$config.projectId,
    storageBucket: ctx.$config.storageBucket,
    messagingSenderId: ctx.$config.messagingSenderId,
    appId: ctx.$config.appId,
    measurementId: ctx.$config.measurementId,
  }

  const apps = getApps()
  if (!apps.length) {
    initializeApp(firebaseConfig)
  }
  setPersistence(getAuth(), browserLocalPersistence)
}
