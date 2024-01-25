import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import { createLanguageModel, createJsonTranslator } from "../typechat"
import type { Entity, PostMetaData } from '../types/entity'
import { type Readability } from '@mozilla/readability'

dotenv.config();

export default async function gpt(url: string, webpage: ReturnType<Readability['parse']>): Promise<Entity|null> {
  if(!webpage) return null

  const model = createLanguageModel(process.env)
  const schema = fs.readFileSync(path.join(__dirname, "../types/entity.d.ts"), "utf8")
  const translator = createJsonTranslator<Entity>(model, schema, "Entity")

  // const shortContent = `${url}
  // title: ${webpage.title}
  // description: ${webpage.excerpt}`

  const content = `webpage url: ${url}
webpage title: ${webpage.title}
lang: ${webpage.lang}
website name: ${webpage.siteName}

${webpage.content.slice(0, 1000)}`

  // TODO add guidelines to prompt
  const response = await translator.translate(content)

  if (!response.success) {
    // TODO retry if respons.message == 'JSON validation failed'
    console.error('GPT extract failed:')
    console.error(response)

    return null
  }

  // if (response.data.type === 'post') {
  //   const translator = createJsonTranslator<PostMetaData>(model, schema, "PostMetaData")
  
  //   const metaDataResponse = await translator.translate(url + '\n' + content)

  //   if (!metaDataResponse.success) {
  //     // TODO retry if respons.message == 'JSON validation failed'
  //     console.error('GPT extract metaData failed:')
  //     console.error(metaDataResponse)

  //     return null
  //   }
  //   console.log(metaDataResponse.data)
  //   response.data.metaData = metaDataResponse.data
  // }

  return response.data
}