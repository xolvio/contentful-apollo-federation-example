import { createClient } from 'contentful-management'
import { verifyThatEnvironmentVariablesAreSet } from './verifyThatEnvironmentVariablesAreSet.js'

async function main() {
  verifyThatEnvironmentVariablesAreSet([
    'CONTENTFUL_ACCESS_TOKEN',
    'CONTENTFUL_SPACE',
    'CONTENTFUL_ENVIRONMENT',
  ])

  const client = createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  })

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE!)
  const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT!)

  const contentType = await environment.createContentTypeWithId('review', {
    name: 'Review',
    fields: [
      {
        id: 'upc',
        name: 'upc',
        type: 'Symbol',
        localized: false,
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
      },
      {
        id: 'body',
        name: 'body',
        type: 'Text',
        localized: false,
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
      },
    ]
  })

  await contentType.publish()

  const entry = await environment.createEntry(contentType.sys.id, {
    fields: {
      upc: {
        'en-US': '1'
      },
      body: {
        'en-US': ''
      }
    },
  })

  await entry.publish()
}

main().catch(error => console.error(error))
