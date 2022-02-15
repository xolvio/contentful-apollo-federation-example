import { ApolloGateway } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer as createProductsServer } from './productsServer.js'
import { createServer as createReviewsServer } from './reviewsServer.js'
import { resolve } from 'path'
import { readFile } from './readFile.js'

async function main() {
  const productsServer = await createProductsServer()
  const reviewsServer = await createReviewsServer()

  const gateway = new ApolloGateway({
    supergraphSdl: await readFile(resolve(__dirname, '../src/supergraph.graphql')),
  })
  const gatewayServer = new ApolloServer({
    gateway,
    // Subscriptions are not currently supported in Apollo Federation
    // subscriptions: false,
  })

  try {
    const { url: productsServerUrl } = await productsServer.listen(4200)
    console.log(`🚀 Products server ready at  ${ productsServerUrl }`)

    const { url: reviewsServerUrl } = await reviewsServer.listen(4300)
    console.log(`🚀 Reviews server ready at  ${ reviewsServerUrl }`)

    const { url } = await gatewayServer.listen()
    console.log(`🚀 Gateway ready at ${ url }`)
  } catch (error: any) {
    console.error(error)
  }
}

main().catch(console.error)
