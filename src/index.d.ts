export type PostMetaData = {
  title: string
  authors: string[]
  type: 'post' | 'blog' | 'poem' | 'essay' | 'comment' | 'novel'
  language: string // iso6391Name
  translator?: string
  url?: string
  lastModified?: string
  originalTitle?: string
  originalUrl?: string
  originalLanguage?: string
}

export type Entry = {
  url: string
  platform: 'mp.weixin' | 'Mirror' | 'Medium' | 'Matters'
  IPFSUrl: string
  name: string
  type: 'post' | 'book' | 'video' | 'podcast'
  metaData: PostMetaData
}