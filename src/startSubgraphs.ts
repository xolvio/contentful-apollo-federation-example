import { createServer as createProductsServer } from './productsServer.js'
import { createServer as createReviewsServer } from './reviewsServer.js'

async function main() {
  const productsServer = await createProductsServer()
  const reviewsServer = await createReviewsServer()

  try {
    const { url: productsServerUrl } = await productsServer.listen(4200)
    console.log(`🚀 Products server ready at  ${ productsServerUrl }`)

    const { url: reviewsServerUrl } = await reviewsServer.listen(4300)
    console.log(`🚀 Reviews server ready at  ${ reviewsServerUrl }`)
  } catch (error: any) {
    console.error(error)
  }
}

main().catch(console.error)
