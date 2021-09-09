// vgscrape-providers <https://github.com/msikma/vgscrape>
// © MIT license

const initInstance = (provider, args) => {
  const instance = {
    _provider: provider,
    mediawiki: provider.driverInstances.mediawiki
  }
  //const drivers = provider.driverInstances
  //const info = drivers.mediawiki.doSomethingCool('hi')
  return instance
}

const manifest = {
  name: 'Liquipedia',
  slug: 'liquipedia',
  provides: ['information'],
  module: {
    initInstance
  },
  dependencies: {
    drivers: [
      ['mediawiki', {
        base: `https://liquipedia.net`,
        url: base => ({ subwiki }) => `${base}/${subwiki}`,
        urlArgs: ['subwiki']
      }]
    ]
  },
  propTypes: {
  }
}

module.exports = manifest
