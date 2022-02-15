export function verifyThatContentfulEnvironmentVariablesAreSet()
{
  const requiredEnvironmentVariables = [
    'CONTENTFUL_SPACE',
    'CONTENTFUL_TOKEN'
  ]

  const missingEnvironmentVariables: string[] = []
  for (const environmentVariable of requiredEnvironmentVariables) {
    if (!process.env[environmentVariable]) {
      missingEnvironmentVariables.push(environmentVariable)
    }
  }
  if (missingEnvironmentVariables.length >= 1) {
    throw new Error(
      'Please set the environment variable ' +
      `${ missingEnvironmentVariables.map(environmentVariable => `"${ environmentVariable }"`).join(', ') }.`
    )
  }
}
