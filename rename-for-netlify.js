import { rename } from 'fs'

const distFolder = 'dist/your-app/server'

rename(`${distFolder}/main.server.js`, `${distFolder}/main-server.js`, (err) => {
  if (err) {
    console.error('Error renaming file:', err)
  } else {
    console.log('Successfully renamed main.server.js to main-server.js')
  }
})

rename(`${distFolder}/polyfills.server.js`, `${distFolder}/polyfills-server.js`, (err) => {
    if (err) {
      console.error('Error renaming file:', err)
    } else {
      console.log('Successfully renamed polyfills.server.js to polyfills-server.js')
    }
  })
