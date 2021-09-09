// vgscrape-lib <https://github.com/msikma/vgscrape>
// © MIT license

const { PropTypes } = require('vgscrape-util')

//https://liquipedia.net/starcraft/api.php?action=query&prop=revisions&titles=AfreecaTV%20StarCraft%20League%20Remastered/4&rvlimit=1&rvslots=*&rvprop=ids|timestamp|size|content|contentmodel|tags|sha1|size&formatversion=2&format=json

const doSomethingCool = instance => () => {
  console.log('called doSomethingCool from', instance._driver.name)
  return { a: 'b' }
}

const initInstance = (driver, { base, url, urlArgs }) => {
  const instance = {
    _driver: driver
  }
  instance.baseURL = url(base)
  instance.doSomethingCool = doSomethingCool(instance)
  return instance
}

const manifest = {
  name: 'MediaWiki',
  slug: 'mediawiki',
  provides: ['information'],
  description: 'Driver for extracting information from MediaWiki-based websites using their API',
  module: {
    initInstance
  },
  propDefaults: {
    urlArgs: []
  },
  propTypes: {
    base: PropTypes.string,
    url: PropTypes.function,
    urlArgs: PropTypes.arrayOf(PropTypes.string).isRequired
  }
}

module.exports = manifest
