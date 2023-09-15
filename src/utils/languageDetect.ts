import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-language-text"

import * as dotenv from "dotenv"
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["LANGUAGE_API_ENDPOINT"] || "<cognitive language service endpoint>"
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>"

export async function languageDectect(content: string) {
  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey))

  const result = await client.analyze("LanguageDetection", [content]);
  const doc = result[0]

  if (doc && 'primaryLanguage' in doc) {
    // console.log(
    //   `Primary language: ${doc.primaryLanguage.name} (iso6391 name: ${doc.primaryLanguage.iso6391Name})`
    // );

    return doc.primaryLanguage.iso6391Name
  } else {
    // Handle error or do something else
    let error = 'Can not detect language'
    if (doc && doc.error) error += doc.error

    throw new Error(error);
  }

}