/**
 * You will play as elephant parser, extract entry from webpage depending on it's main content.
 */

export interface BaseEntity {
  /**
   * The url of this entity.
   */
  url: string;
  /**
   * The version of this entity.
   */
  version: "20231121";

  parser: "elephant";
}

export interface Entity extends BaseEntity {
  /**
   * The title of this entity.
   */
  title?: string;
  /**
   * The description of this entity.
   */
  description?: string;
  /**
   * The cover of this entity.
   * @example
   * ['https://example.com/cover.jpg']
   */
  covers?: Media[];
  /**
   * The ipfs url of the content of this entity.
   */
  IPFSUrl?: string;
  /**
   * The possible other links of this entity.
   */
  links?: string[];
  /**
   * The type of this entity.
   *  - `post` (default type) : Any content like a blog post, a tweet post, an article... The metaData type should be PostMetaData.
   *  - `book` : book. The metaData type should be BookMetaData.
   *  - `podcast` : podcast. The metaData type should be PodcastMetaData.
   *  - `song` : a song
   *  - `video` : video
   *  - `paper` : academic paper, scholarly articles, formal piece of writing about an academic subject.
   *  - `movie` : a movie
   *  - `game` : a game
   */
  type?: "post" | "book" | "podcast" | "video" | "paper" | "song" | "movie" | "game";
  /**
   * The metadata of this entity.
   */
  metaData?: PostMetaData | BookMetaData | PodcastMetaData | DefaultMetaData;
}

interface DigitalContent<Derivation extends "translation" | "original"> {
  /**
   * The platform of the url.
   *  eg, "mp.weixin" | "Mirror" | "Medium" | "Matters" | "Personal Blog" | "Other" | "douban";
   *
   */
  platform?: string;
  /**
   * The authors of this content.
   */
  authors?: string[];
  /**
   * The language of this post entry, iso639-1Name.
   */
  language?: string;
  /**
   * The collection of the content.
   */
  column?: string;
  /**
   * The publish date of the content.
   */
  publishDate?: string;
  /**
   * The update date of the content.
   */
  lastModified?: string;
  /**
   * The copyright statement or open source license of the content(like CC0 / CC BY-NC-ND / MIT license / Apache).
   */
  copyright?: string;
  /**
   * If this book is a translation, translators of this book.
   */
  translators?: Derivation extends "translation" ? string[] : never;
  /**
   * If this book is a translation, the original book's URL.
   */
  originalUrl?: Derivation extends "translation" ? string : never;
  /**
   * If this book is a translation, the original book's title.
   */
  originalTitle?: Derivation extends "translation" ? string : never;
  /**
   * If this book is a translation, the original book's language.
   */
  originalLanguage?: Derivation extends "translation" ? string : never;
}

export interface DefaultMetaData extends DigitalContent<"translation" | "original"> {}

export interface BookMetaData extends DigitalContent<"translation" | "original"> {
  /**
   * Pages of this book.
   */
  pages?: number;
  /**
   * ISBN of this book.
   */
  ISBN?: string;
}

export interface PostMetaData extends DigitalContent<"translation" | "original"> {
  /*
   * The type of the post.
   */
  type: "post" | "blog" | "poem" | "essay" | "comment" | "novel";
  /**
   * The keywords of this post.
   */
  keywords?: string[];
}

export interface PodcastMetaData extends DigitalContent<"translation" | "original"> {
  /*
   * The host of the podcast episode.
   */
  host?: string;
  /**
   * The guests of this podcast episode.
   */
  guests?: string[];
}

interface Media {
  /**
   * The name of this attachment.
   */
  name?: string;
  /**
   * The address (uri) of this attachment.
   */
  address?: string;
  /**
   * The mime type of the `content`.
   */
  mime_type?: string;
  /**
   * The size of the `content` in bytes.
   */
  size_in_bytes?: number;
  /**
   * The alternate text (description) of this attachment.
   * This is used for accessibility or is displayed when the source is not available.
   */
  alt?: string;
  /**
   * The width of this attachment, in pixels.
   */
  width?: number;
  /**
   * The height of this attachment, in pixels.
   */
  height?: number;
}