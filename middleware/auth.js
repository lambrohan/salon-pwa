export default function ({ store, redirect }) {
  console.log(store.state.authenticated)
  if (!store.state.authenticated) {
    return redirect('/auth/login')
  }
}
