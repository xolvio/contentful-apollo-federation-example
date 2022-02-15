import { ApolloGateway } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server'
import { resolve } from 'path'
import { readFile } from './readFile.js'

async function main() {
  const gateway = new ApolloGateway({
    supergraphSdl: await readFile(resolve(__dirname, '../src/supergraph.graphql')),
  })
  const gatewayServer = new ApolloServer({
    gateway,
    // Subscriptions are not currently supported in Apollo Federation
    // subscriptions: false,
  })

  try {
    const { url } = await gatewayServer.listen()
    console.log(`🚀 Gateway ready at ${ url }`)
  } catch (error: any) {
    console.error(error)
  }
}

main().catch(console.error)
