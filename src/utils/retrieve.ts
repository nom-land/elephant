import fetch from 'cross-fetch'

export type RetrieveOptions = RequestInit & {
  proxy?: {
    target: string
    headers?: Record<string, string>
  }
}

interface ProfetchOptions {
  proxy?: RetrieveOptions['proxy']
  signal?: RetrieveOptions['signal']
}

const proxyFetch = async (url: string, options: ProfetchOptions = {}) => {
  const { proxy, signal = null } = options
  if (!proxy || !proxy.target) {
    throw new Error('proxy is required')
  }
  const {
    target,
    headers = {},
  } = proxy
  const res = await fetch(target + encodeURIComponent(url), {
    headers,
    signal,
  })
  return res
}
export default async function retrieve(url: string, options: RetrieveOptions = {}) {
  const {
    headers = {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
    },
    proxy = null,
    signal = null,
  } = options

  const res = proxy ? await proxyFetch(url, { proxy, signal }) : await fetch(url, { headers, signal })

  const status = res.status
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`)
  }
  const text = await res.text()
  return text.trim()
}