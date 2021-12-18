import { getApps, initializeApp } from '@firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyCzjd1ZaYnEngVSTm3Uf6WCz2ORKnJM1GQ',
  authDomain: 'ubu-salon.firebaseapp.com',
  projectId: 'ubu-salon',
  storageBucket: 'ubu-salon.appspot.com',
  messagingSenderId: '461522923561',
  appId: '1:461522923561:web:c694accb0ceba8c91b6c38',
  measurementId: 'G-96NH3VKWMR',
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
