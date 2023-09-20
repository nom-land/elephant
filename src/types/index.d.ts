/**
 * Extract entry from webpage depending on it's main content.
 */
export interface Entry {
  url: string
  platform: 'mp.weixin' | 'Mirror' | 'Medium' | 'Matters' | 'Personal Blog' | 'Other' | 'douban'
  IPFSUrl: string
  name: string
  type: 'post' /* any content like a blog post, a tweet post, an article... */ | 'book' /* book */ | 'video' /* video */ | 'podcast' /* podcast */ | 'paper'
  metaData: PostMetaData | BookMetaData
}

export interface PostMetaData {
  title: string
  // author names
  authors: string[]
  // type of post
  type: 'post' | 'blog' | 'poem' | 'essay' | 'comment' | 'novel'
  // language of this post entry, iso6391Name
  language: string
  // keywords
  keywords?: string[]
  // translator names
  translators?: string[]
  url?: string
  // post date or modified date
  lastModified?: string
  // original post title
  originalTitle?: string
  originalUrl?: string
  originalLanguage?: string
}

export interface BookMetaData {
  title: string
  // author names
  authors: string[]
  // language of this book, iso6391Name
  language: string
  // translator names
  translators?: string[]
  // Publish date
  publishDate?: string
  // how many pages
  pages?: number
  ISBN?: string
}