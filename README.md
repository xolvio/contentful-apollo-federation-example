# contentful-apollo-federation example

Example repo showing how to use this package:
https://github.com/xolvio/contentful-federation/

## How to run

### Creating the content in Contentful

This creates a "Review" content type and a "Review" content entry.

```sh
npm run build && CONTENTFUL_SPACE=<CONTENTFUL_SPACE_ID> CONTENTFUL_ACCESS_TOKEN=<CONTENTFUL_CONTENT_MANAGEMENT_TOKEN> CONTENTFUL_ENVIRONMENT=<CONTENTFUL_ENVIRONMENT> npm run create-content
```

Alternatively you can also [create the content manually](#creating-the-contentful-content-manually) through the Contentful UI.

### Installation

```sh
npm install
```

### Building

```
npm run build
```

### Starting

#### Starting subgraph servers

```sh
CONTENTFUL_SPACE=<SPACE> CONTENTFUL_ACCESS_TOKEN=<ACCESS_TOKEN> npm run start-subgraphs
```

#### Composing the supergraph

##### Requirements

* [Rover CLI with Federation 2 plugin installed](https://www.apollographql.com/docs/federation/v2/quickstart/setup/#1-install-the-rover-cli)

```sh
npm run compose
```

#### Starting gateway server

```sh
npm run start-gateway
```

## Creating the Contentful content manually

### Creating the model in Contentful

1. In the Contentful UI, go to the page "Content model":
2. Add content type
1. Name: Review
2. Create
3. Add field 1. Type: Text 2. Name: upc 3. Create
4. Add field 1. Type: Text 2. Name: body 3. Long text, full-text search 4. Create
5. Save

### Creating the content in Contentful

1. In the Contentful UI, go to the page "Content":
2. Add entry: Review
1. upc: 1
2. Publish
