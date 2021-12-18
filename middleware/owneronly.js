export default function ({ store, redirect, route }) {
  if (!store.getters.userIsOwner) {
    redirect('/')
  }
}
