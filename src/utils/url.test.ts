/* eslint-env jest */
import {
  isValidUrl,
  purify as purifyUrl,
} from './url'

describe('test isValidUrl()', () => {
  const cases = [{
    url: 'https://www.23hq.com',
    expected: true,
  }, {
    url: 'https://secure.actblue.com',
    expected: true,
  }, {
    url: 'https://docs.microsoft.com/en-us/azure/iot-edge/quickstart?view=iotedge-2018-06',
    expected: true,
  }, {
    url: 'http://192.168.1.199:8081/example/page',
    expected: true,
  }, {
    url: 'ftp://192.168.1.199:8081/example/page',
    expected: false,
  }, {
    url: '',
    expected: false,
  }, {
    url: null,
    expected: false,
  }, {
    url: { a: 'x' },
    expected: false,
  }]

  cases.forEach(({ url, expected }) => {
    test(`isValidUrl("${url}") must return "${expected}"`, () => {
      const result = isValidUrl(url as unknown as string)
      expect(result).toEqual(expected)
    })
  })
})


describe('test purifyUrl()', () => {
  const entries = [
    {
      url: '',
      expected: null,
    },
    {
      url: {},
      expected: null,
    },
    {
      url: 'https://some.where/article/abc-xyz',
      expected: 'https://some.where/article/abc-xyz',
    },
    {
      url: 'https://some.where/article/abc-xyz#name,bob',
      expected: 'https://some.where/article/abc-xyz',
    },
    {
      url: 'https://some.where/article/abc-xyz?utm_source=news4&utm_medium=email&utm_campaign=spring-summer',
      expected: 'https://some.where/article/abc-xyz',
    },
    {
      url: 'https://some.where/article/abc-xyz?q=3&utm_source=news4&utm_medium=email&utm_campaign=spring-summer',
      expected: 'https://some.where/article/abc-xyz?q=3',
    },
    {
      url: 'https://some.where/article/abc-xyz?pk_source=news4&pk_medium=email&pk_campaign=spring-summer',
      expected: 'https://some.where/article/abc-xyz',
    },
    {
      url: 'https://some.where/article/abc-xyz?q=3&pk_source=news4&pk_medium=email&pk_campaign=spring-summer',
      expected: 'https://some.where/article/abc-xyz?q=3',
    },
    {
      url: 'https://some.where/article/abc-xyz?q=3&pk_source=news4&pk_medium=email&pk_campaign=spring-summer',
      expected: 'https://some.where/article/abc-xyz?q=3',
    },
    {
      url: 'https://www.bilibili.com/video/BV1kR4y1b7ad/?share_from=ugc&share_medium=iphone&share_plat=ios&share_session_id=9F2BFC14-D7EE-4563-A1CF-BCBCD88411CE&share_source=WEIXIN&share_tag=s_i&timestamp=1675138710',
      expected: 'https://www.bilibili.com/video/BV1kR4y1b7ad/?timestamp=1675138710',
    },
    // {
    //   url: 'http://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MjY3Nw==&mid=2247493457&idx=1&sn=cfab85b9342fd2c67030d3cd9abc11c4&chksm=cedbb97bf9ac306de6f4b049f159f3e9e97c07c86edebb9935addb91705c35d659f5c4ee6c5f&mpshare=1&scene=1&srcid=0727aLPimHzDMZm9TwMrcSL2&sharer_sharetime=1690463376928&sharer_shareid=7e1d69381d3124f6f0a4ff9b1da3648f#rd',
    //   expected: 'https://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MjY3Nw==&mid=2247493457&idx=1&sn=cfab85b9342fd2c67030d3cd9abc11c4',
    // }
    // {
    //   url: 'https://m.weibo.cn/status/4856010412395824?wm=3333_2001&from=10D0093010&sourcetype=weixin',
    //   expected: 'https://m.weibo.cn/status/4856010412395824'
    // }
  ]
  entries.forEach((entry) => {
    const {
      url,
      expected,
    } = entry
    test(`purifyUrl("${url}") must become "${expected}"`, () => {
      const result = purifyUrl(url)
      expect(result).toEqual(expected)
    })
  })
})
