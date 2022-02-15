import { buildSubgraphSchema } from '@apollo/subgraph'
import { ApolloServer, gql } from 'apollo-server'
import { resolve } from 'path'
import { readFile } from './readFile.js'

interface Product {
  upc: string
  price: number
}

const products = new Map<string, Product>([
  [
    '1',
    {
      upc: '1',
      price: 10,
    },
  ],
])

function fetchProductByUpc(upc: string): Product | null {
  return products.has(upc) ? products.get(upc)! : null
}

export const resolvers = {
  Query: {
    product(_: any, { upc }: { upc: string }): Product | null {
      return fetchProductByUpc(upc)
    }
  },
  Review: {
    product(review: any): Product | null {
      return fetchProductByUpc(review.upc)
    }
  }
}

export async function createServer(): Promise<any> {
  const typeDefs = gql`${await readFile(resolve(__dirname, '../src/products.graphql'))}`
  return new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    resolvers
  })
}
