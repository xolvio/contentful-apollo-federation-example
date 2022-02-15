import type { DocumentNode } from 'graphql'
import { resolve } from 'path'
import { createApolloFederationEnabledContentfulServer, removeArgumentsFromField } from 'contentful-apollo-federation'
import { readFile } from './readFile.js'
import { verifyThatContentfulEnvironmentVariablesAreSet } from './verifyThatContentfulEnvironmentVariablesAreSet.js'
import { writeFile } from './writeFile.js'
import { ContentfulAPI } from './ContentfulAPI.js'

export async function createServer(): Promise<any> {
  verifyThatContentfulEnvironmentVariablesAreSet()

  const space = process.env.CONTENTFUL_SPACE!
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!

  const {server, schema} = await createApolloFederationEnabledContentfulServer(
    {
      space,
      accessToken,
      schemaAdditions: await readFile(resolve(__dirname, '../src/reviews_additions.graphql')),
      modifySchema(ast: DocumentNode) {
        const reviewTypeNode: any = ast.definitions.find((node: any) => node.name.value === 'Review')!
        removeArgumentsFromField(reviewTypeNode, 'upc')
      },
      additionalResolvers: {
        Product: {
          async reviews(product: any, _: any, { dataSources }: any): Promise<any[]> {
            const response = await dataSources.contentfulAPI.getReviewsForProduct(product.upc)
            return response.body.data.reviewCollection.items
          },
        },
      },
      contentfulAPI: new ContentfulAPI({
        space,
        accessToken
      })
    }
  )

  await writeFile(resolve(__dirname, '../src/reviews.graphql'), schema) // For composing the super graph

  return server
}
