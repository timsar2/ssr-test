import { rename, existsSync } from 'fs'

const distFolder = 'dist/server-side'
const filesToRename = [
  { old: `${distFolder}/server/index.server.js`, new: `${distFolder}/server/index-server.js` },
  { old: `${distFolder}/server/main.server.js`, new: `${distFolder}/server/main-server.js` },
  { old: `${distFolder}/server/polyfills.server.js`, new: `${distFolder}/server/polyfills-server.js` }
]

filesToRename.forEach(({ old, new: newPath }) => {
  if (existsSync(old)) {
    rename(old, newPath, (err) => {
      if (err) console.error(`Error renaming ${old}:`, err)
      else console.log(`Successfully renamed ${old} to ${newPath}`)
    })
  } else {
    console.error(`File not found: ${old}`)
  }
})
