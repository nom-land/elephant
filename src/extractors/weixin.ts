import { type PostMetaData } from '../types/index'
import { languageDectect } from '../utils/languageDetect'
import { matchMetaName, match, matchProperty } from '../utils/match'

function extractAuthor(content: string) {
  const metaAuthor = matchMetaName('author', content)
  if (metaAuthor) {
    return [metaAuthor]
  }

  const jsNameAuthor = match(new RegExp(`id=\"js_name\">([^\"]*?)<\/a>`, "s"), content)
  if (jsNameAuthor) {
    return [jsNameAuthor]
  }

  return []
}

function extractLastModified(content: string) {
  const lastModified = match(new RegExp('<div role="option" class="media_tool_meta tips_global_primary meta_primary"><span>.*?<span>(.*?)</span>'), content)
  if (lastModified) {
    return lastModified
  }

  const publishTime = match(new RegExp('var createTime = \'(.*?)\'', 's'), content)
  if (publishTime) {
    return publishTime
  }

  return ''
}

export default async function weixin(url: string, content: string): Promise<PostMetaData> {
  const title = matchProperty('og:title', content)
  const language = await languageDectect(title)
  const lastModified = extractLastModified(content)

  return {
    title,
    authors: extractAuthor(content),
    type: 'post',
    language,
    url,
    lastModified
  }
}