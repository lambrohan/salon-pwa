import Cookie from 'js-cookie'

export default function ({ store, redirect }) {
  if (!store.state.authenticated) {
    if (Cookie.get('Authorization')) {
      window.location.reload()
    }
    return redirect('/auth/login')
  }
}
