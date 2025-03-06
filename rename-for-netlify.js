import fs from 'fs'
import path from 'path'

const directoriesToSearch = ['dist/server-side/server', 'dist/server-side/browser']

// Function to rename files
const renameFilesInDirectory = (directory) => {
  try {
    console.log(`Searching in directory: ${directory}`)
    const files = fs.readdirSync(directory) // Get all files in the directory
    console.log(`Files found in ${directory}:`, files)

    files.forEach(file => {
      if (file.includes('.')) {
        const lastDotIndex = file.lastIndexOf('.')
        const nameWithoutExt = file.substring(0, lastDotIndex).replace(/\./g, '-') // Replace all dots except last one
        const extension = file.substring(lastDotIndex) // Keep the last dot and extension
        const newFileName = nameWithoutExt + extension

        if (file !== newFileName) {
          const oldPath = path.join(directory, file)
          const newPath = path.join(directory, newFileName)

          console.log(`Renaming: ${oldPath} -> ${newPath}`)
          try {
            fs.renameSync(oldPath, newPath)
            console.log(`Successfully renamed: ${oldPath} -> ${newPath}`)
          } catch (err) {
            console.error(`Error renaming ${oldPath} to ${newPath}:`, err)
          }
        }
      }
    })
  } catch (err) {
    console.error(`Error reading directory ${directory}:`, err)
  }
}

// Function to update file contents
const updateFileContents = (directory) => {
  try {
    console.log(`Updating file contents in directory: ${directory}`)
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.mjs')) // Only .mjs files

    files.forEach(file => {
      const filePath = path.join(directory, file)
      let content = fs.readFileSync(filePath, 'utf-8')

      let updatedContent = content.replace(/\b([\w-]+)\.server\b/g, '$1-server')
      updatedContent = updatedContent.replace(/\b([\w-]+)\.csr\b/g, '$1-csr')
      updatedContent = updatedContent.replace(/\b([\w-]+)\.polyfills\b/g, '$1-polyfills')

      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf-8')
        console.log(`Updated content in: ${filePath}`)
      }
    })
  } catch (err) {
    console.error(`Error updating files in directory ${directory}:`, err)
  }
}

// Process all directories
directoriesToSearch.forEach(directory => {
  console.log(`\nStarting renaming process in: ${directory}`)
  renameFilesInDirectory(directory)
  updateFileContents(directory)
})
