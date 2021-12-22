export default function ({ store, redirect, route }) {
  if (store.getters.getPartner.role) {
    redirect('/')
  }
}
