export default function (ctx) {
  ctx.$axios.onError((e) => {
    const msg = e.response?.data?.message
    if (msg) {
    }
  })
}
