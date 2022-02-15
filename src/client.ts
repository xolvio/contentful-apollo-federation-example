import fetch from 'cross-fetch'

async function main() {
  const response = await fetch(
    'http://localhost:4000/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: `
          {
            product(upc: "1") {
              upc
              price
              reviews {
                body
              }
            }
            
            review(id: "o54VS6xVZJ74NChKG0ixe") {
              body
              product {
                upc
                price
              }
            }
          }`
      })
    }
  )

  const data = JSON.parse(await response.text())

  console.log(JSON.stringify(data, null, 2))
}

main().catch(console.error)
