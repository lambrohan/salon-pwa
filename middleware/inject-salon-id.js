export default function ({ store, redirect, route }) {
  const liteSalons = store.getters['salon/getLiteSalons']
  const partnerSalon = store.getters.getPartner.salon
  const salonId = route.params.salonId
  const liveChairRoute = /\/livechairs\/*/g
  if (salonId) return
  if (route.path.match(liveChairRoute)) {
    if (liteSalons.length) {
      redirect(route.path + '/' + liteSalons[0].id)
    } else if (partnerSalon) {
      redirect(route.path + '/' + partnerSalon)
    }
  }
}
