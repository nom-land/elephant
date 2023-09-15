import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import { createLanguageModel, createJsonTranslator } from "typechat"
import { type PostMetaData } from '../types/index'

dotenv.config();


export default async function gpt(url: string, content: string): Promise<PostMetaData|null> {
  const model = createLanguageModel(process.env)
  const schema = fs.readFileSync(path.join(__dirname, "../types/index.d.ts"), "utf8")
  const translator = createJsonTranslator<PostMetaData>(model, schema, "PostMetaData")

  const response = await translator.translate(url + '\n' + content)
  if (!response.success) {
    console.error('GPT extract failed:')
    console.error(response)
    return null
  }

  return response.data
}