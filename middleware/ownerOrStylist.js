export default function ({ store, redirect, route }) {
  if (!store.getters.getSalonRole) {
    redirect('/onboard/user')
  }
}
