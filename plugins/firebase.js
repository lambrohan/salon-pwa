import { getApps, initializeApp } from '@firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
}
const apps = getApps()
let firebaseApp
if (!apps.length) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  firebaseApp = apps[0]
}
const auth = getAuth(firebaseApp)
setPersistence(auth, browserLocalPersistence)
export { auth }
