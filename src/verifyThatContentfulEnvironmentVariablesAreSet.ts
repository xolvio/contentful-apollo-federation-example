import { verifyThatEnvironmentVariablesAreSet } from './verifyThatEnvironmentVariablesAreSet.js'

export function verifyThatContentfulEnvironmentVariablesAreSet()
{
  const requiredEnvironmentVariables = [
    'CONTENTFUL_SPACE',
    'CONTENTFUL_ACCESS_TOKEN'
  ]

  verifyThatEnvironmentVariablesAreSet(requiredEnvironmentVariables)
}
