export function match(regex: RegExp, content: string) {
  const meta = content.match(regex);
  if (meta && meta[1]) {
    return meta[1].trim();
  }
  return '';
}

export function matchMetaName(metaName: string, content: string) {
  return match(new RegExp(`<meta name=\"${metaName}\" content=\"(.*?)\"`, 's'), content);
}

export function matchProperty(metaName: string, content: string) {
  return match(new RegExp(`<meta property=\"${metaName}\" content=\"(.*?)\"`, 's'), content);
}
