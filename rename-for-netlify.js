import fs from 'fs'
import path from 'path'

// Paths to the files
const distFolder = 'dist/server-side'
const mainFileOld = path.join(distFolder, 'server/main.server.mjs')
const mainFileNew = path.join(distFolder, 'server/main-server.mjs')
const polyFileOld = path.join(distFolder, 'server/polyfills.server.mjs')
const polyFileNew = path.join(distFolder, 'server/polyfills-server.mjs')
const indexFileOld = path.join(distFolder, 'server/index.server.html')
const indexFileNew = path.join(distFolder, 'server/index-server.html')
const indexCsrFileOld = path.join(distFolder, 'browser/index.csr.html')
const indexCsrFileNew = path.join(distFolder, 'browser/index-csr.html')
const manifestFile = path.join(distFolder, 'server/angular-app-engine-manifest.mjs')

// Step 1: Rename the files
const renameFile = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(`Error renaming ${oldPath}: ${err}`)
      } else {
        resolve(`Successfully renamed ${oldPath} to ${newPath}`)
      }
    })
  })
}

const updateManifest = (filePath, oldImport, newImport) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (readErr, data) => {
      if (readErr) {
        reject(`Error reading manifest file: ${readErr}`)
        return
      }
      // Update the import statement in the manifest
      const updatedData = data.replace(oldImport, newImport)

      fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
        if (writeErr) {
          reject(`Error updating manifest file: ${writeErr}`)
        } else {
          resolve(`Successfully updated manifest file`)
        }
      })
    })
  })
}

const run = async () => {
  try {
    // Rename the files
    await renameFile(mainFileOld, mainFileNew)
    await renameFile(polyFileOld, polyFileNew)
    await renameFile(indexFileOld, indexFileNew)
    await renameFile(indexCsrFileOld, indexCsrFileNew)
    console.log('Renaming completed.')

    // Update the manifest file
    await updateManifest(manifestFile, './main.server.mjs', './main-server.mjs')
    await updateManifest(manifestFile, './polyfills.server.mjs', './polyfills-server.mjs')
    await updateManifest(manifestFile, './index.server.html', './index-server.html')
    await updateManifest(manifestFile, './index.csr.html', './index-csr.html')
    console.log('Manifest update completed.')
  } catch (err) {
    console.error(err)
  }
}

run()
