import { describe, expect, test } from '@jest/globals'
import weixin from './weixin'

describe('test weixin()', () => {
  test('weixin() must return article metadata', () => {
    const cases = [{
      url: 'https://mp.weixin.qq.com/s/WCtsn7qsmwJQE27luF7xJA',
      content: `<head>
      <meta name="description" content="小程序手势组件上新！\x0d\x0a轻轻一拉，灵活上下，丝滑不卡……">
      <meta name="author" content="微信团队">
      <meta property="og:title" content="小程序手势 打开半屏新姿势">
      <meta property="og:description" content="小程序手势组件上新！\x0d\x0a轻轻一拉，灵活上下，丝滑不卡……">
      <meta property="og:site_name" content="微信公众平台">
      <meta property="og:type" content="article">
      <meta property="og:article:author" content="微信团队">
      <title>小程序手势 打开半屏新姿势</title>
    </head><body><em id="publish_time" class="rich_media_meta rich_media_meta_text">2023-03-02 17:30</em></body>`,
      expected: {
        type: 'post',
        title: '小程序手势 打开半屏新姿势',
        authors: ['微信团队'],
        language: 'zh-CN',
        url: 'https://mp.weixin.qq.com/s/WCtsn7qsmwJQE27luF7xJA',
        lastModified: '2023-03-02 17:30',
        translator: null,
        originalTitle: null,
        originalUrl: null,
        originalLanguage: null
      },
    }]

    cases.forEach(async ({ url, content, expected }) => {
      const result = await weixin(url, content)
      expect(result).toEqual(expected)
    })
  })
})