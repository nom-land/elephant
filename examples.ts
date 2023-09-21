import { extract } from './src'

(async function demo() {
  // book
  // const data = await extract('https://book.douban.com/subject/36466773')

  // paper
  // const data = await extract('https://arxiv.org/abs/2309.04269')

  // podcast
  const data = await extract('https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5zb3VuZGNsb3VkLmNvbS91c2Vycy9zb3VuZGNsb3VkOnVzZXJzOjc1ODgzMTg3NS9zb3VuZHMucnNz/episode/Y2xtcjU5dzl4MDJoejAxeTdmbHVqOGd4NQ?sa=X&ved=0CAUQkfYCahcKEwjAi6ny7buBAxUAAAAAHQAAAAAQLA&hl=zh-TW')

  // post
  // const data = await extract('https://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MjY3Nw==&mid=2247493457&idx=1&sn=cfab85b9342fd2c67030d3cd9abc11c4')
  // const data = await extract('https://atlasoin.xyz/2021/06/05/commit-my-heart/')
  // const data = await extract('https://world.mirror.xyz/HPnGATExoyMTDgITJNV7VRw0WzlQ0HN50f2ZHqElXGM')

  // const data = await extract('https://www.jintian.net/today/?action-viewnews-itemid-68562')

  console.log(data)
})()