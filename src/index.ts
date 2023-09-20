import { isValidUrl } from './utils/url'
import { isString } from './utils/function'
import retrieve, { type RetrieveOptions } from './utils/retrieve'

import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

import weixin from './extractors/weixin'
import gpt from './extractors/gpt'

export async function archive(url: string, fetchOptions: RetrieveOptions = {}) {
  if (!isString(url)) {
    throw new Error('Input must be a string')
  }

  if (!isValidUrl(url)) {
    return null
  }

  const html = await retrieve(url, fetchOptions)
  if (!html) {
    return null
  }

  const entry = await extract(url, html)

  console.log(entry)

}

export async function extract(url: string, content: string) {

  if (/mp.weixin.qq.com/.test(url)) {
    return await weixin(url, content)
  }

  const doc = new JSDOM(content)
  let reader = new Readability(doc.window.document)
  let webpage = reader.parse()

  if (!webpage) {
    return null
  }
  console.log(webpage.content, webpage.siteName, webpage.dir, webpage.excerpt)
  return
  // console.log(webpage.textContent, webpage.title, webpage.length)
  return await gpt(url, webpage)
}
