import 'dotenv/config'
import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
import path from 'path'

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })

async function main() {
  const dirPath = './images'
  const files = fs.readdirSync(dirPath).map(file =>
    new File([fs.readFileSync(path.join(dirPath, file))], file)
  )
  const cid = await client.storeDirectory(files)
  console.log('Directory CID:', cid)
}

main().catch(console.error)