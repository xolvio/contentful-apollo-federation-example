# contentful-apollo-federation example

## Requirements

* [Rover CLI with Federation 2 plugin](https://www.apollographql.com/docs/federation/v2/quickstart/setup/#1-install-the-rover-cli)

## How to run

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

```sh
npm run compose
```

#### Starting gateway server

```sh
npm run start-gateway
```
