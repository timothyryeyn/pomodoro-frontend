export default function (context) {
  context.$axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  context.$axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    context.error({ statusCode: code, message: 'err message' })
  })
}
