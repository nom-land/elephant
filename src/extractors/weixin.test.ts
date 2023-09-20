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
    </head><body><script type="text/javascript" nonce="1948247601" reportloaderror>var __INLINE_SCRIPT__ = (function () {
      'use strict';
      if (!window.__second_open__) {
        var svrDate = '1695238845';
        var oriCreateTime = '1677749458';
        var createTime = '2023-03-02 17:30';
        __setPubTime(svrDate, oriCreateTime, createTime, document.getElementById('publish_time'));
        window.__setPubTime = __setPubTime;
      }
    
      return __setPubTime;
    
    })();</script></body>`,
      expected: {
        type: 'post',
        title: '小程序手势 打开半屏新姿势',
        authors: ['微信团队'],
        language: 'zh_chs',
        url: 'https://mp.weixin.qq.com/s/WCtsn7qsmwJQE27luF7xJA',
        lastModified: '2023-03-02 17:30'
      },
    }]

    cases.forEach(async ({ url, content, expected }) => {
      const result = await weixin(url, content)
      expect(result).toEqual(expected)
    })
  })
})