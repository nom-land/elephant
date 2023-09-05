import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import { createLanguageModel, createJsonTranslator, processRequests } from "typechat"
import { type PostMetaData } from '../index'

dotenv.config();


export default async function gpt(url: string, content: string) :Promise<PostMetaData> {
    const model = createLanguageModel(process.env)
    const schema = fs.readFileSync(path.join(__dirname, "../index.d.ts"), "utf8")
    const translator = createJsonTranslator<PostMetaData>(model, schema, "PostMetaData")
    
    const response = await translator.translate(content)
    if (!response.success) {
        console.error('GPT extract failed:')
        console.error(response)
        return;
    }
    
    return response.data
  }