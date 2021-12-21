export default function ({ store, redirect, route }) {
  console.log(store.getters.getPartner)
  if (store.getters.getPartner) {
    redirect('/')
  }
}
