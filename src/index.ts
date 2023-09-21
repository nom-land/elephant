import { isValidUrl } from './utils/url'
import { isString } from './utils/function'
import retrieve, { type RetrieveOptions } from './utils/retrieve'

import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

import weixin from './extractors/weixin'
import gpt from './extractors/gpt'

export async function fetch(url: string, fetchOptions: RetrieveOptions = {}) {
  if (!isString(url)) {
    throw new Error('Input must be a string')
  }

  if (!isValidUrl(url)) {
    return null
  }

  return await retrieve(url, fetchOptions)
}

export async function extract(url: string) {
  const html = await fetch(url)
  if (!html) {
    return null
  }

  if (/mp.weixin.qq.com/.test(url)) {
    return await weixin(url, html)
  }

  const dom = new JSDOM(html)
  let reader = new Readability(dom.window.document)
  let webpage = reader.parse()
  if (!webpage) {
    return null
  }

  let metaTags = dom.window.document.querySelectorAll('meta')
  let metaString = Array.from(metaTags).reduce((acc, metaTag) => {
    return acc + metaTag.outerHTML + '\n';
  }, '')
  webpage.content = metaString + webpage.content

  const additionalContent = applyRules(url, dom)
  webpage.content += additionalContent

  return await gpt(url, webpage)
}

// apply domain/url pattern specific rules defined in rules.ts
// e.g. add ld+json to webpage.content for douban.com
function applyRules(url: string, dom: JSDOM): string {
  const rules = [
    {urlPattern: '.*\.douban\.com', querySelector: '.subject'},
    {urlPattern: 'arxiv.org\/abs\/.*', about: 'About arxiv.org: arXiv is a curated research-sharing platform open to anyone. This is a webpage about a paper.\nType: paper'}
  ];

  // TODO match multiple rules
  for (const rule of rules) {
    if (!new RegExp(rule.urlPattern).test(url)) continue

    if (rule.about) return rule.about

    if(!rule.querySelector) return ''
    const elements = dom.window.document.querySelectorAll(rule.querySelector)
    if (elements.length) {
      return Array.from(elements).reduce((acc, el) => {
        return acc + el.textContent + '\n';
      }, rule.about ?? '').replaceAll(/[\n\s]+/g, '\n')
    }
  }

  return ''
}