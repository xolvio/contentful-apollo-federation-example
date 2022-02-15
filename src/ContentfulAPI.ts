import { ContentfulAPI as ContentfulAPIBase } from 'contentful-apollo-federation/ContentfulAPI.js'

export class ContentfulAPI extends ContentfulAPIBase {
  async getReviewsForProduct(upc: string): Promise<any> {
    return await this.query(`
      {
        reviewCollection(where: {upc: "${ upc }"}) {
          items {
            sys {
              id
            }
            upc
            body
          }
        }
      }
    `)
  }
}
