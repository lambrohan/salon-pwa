export default function ({ store, redirect, route }) {
  const liteSalons = store.getters['salon/getLiteSalons']
  const salonId = route.params.salonId
  const liveChairRoute = /\/livechairs\/*/g
  if (route.path.match(liveChairRoute)) {
    if (!salonId && liteSalons.length) {
      redirect(route.path + '/' + liteSalons[0].id)
    }
  }
}
