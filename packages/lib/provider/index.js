// vgscrape-lib <https://github.com/msikma/vgscrape>
// © MIT license

const { providers } = require('vgscrape-providers')
const { log, validateObjectProps } = require('vgscrape-util')
const { getDriver } = require('../driver')
const { vgsProviderError } = require('./error')
const { wrapProviderMethod } = require('./wrapper')

/** Providers are stored here after they're decorated. */
const initialized = {}

/*
{
  name: 'Liquipedia',
  slug: 'liquipedia',
  provides: ['information'],
  module: {
    driver: [
      ['mediawiki', {
        base: `https://liquipedia.net`,
        url: (subwiki) => `${base}/${subwiki}`,
        requiresArgs: ['subwiki']
      }]
    ]
  }
}
 */

const initProvider = (slug, callerTarget = {}) => {
  if (!providers[slug]) throw new Error(`provider "${slug}" does not exist: requested by target "${callerTarget.slug}"`)
  if (initialized[slug]) return initialized[slug]

  const manifest = providers[slug]

  try {
    const provider = { ...manifest }
    provider._type = 'provider'
    for (const [name, fn] of Object.entries(provider.module)) {
      provider.module[name] = wrapProviderMethod(manifest, fn)
    }
    provider.driverInstances = {}
    for (const driver of Object.values(provider.dependencies.drivers)) {
      const [driverSlug, args] = driver
      provider.driverInstances[driverSlug] = getDriver(driverSlug, args, provider)
    }
    initialized[slug] = provider
    return provider
  }
  catch (err) {
    initialized[slug] = null
    throw vgsProviderError(`failed to initialize provider "${slug}": requested by target "${callerTarget.slug}"`, err)
  }
}

const getProvider = (slug, args, callerTarget) => {
  const provider = initProvider(slug, callerTarget)
  const providerInstance = provider.module.initInstance(provider, validateObjectProps(vgsProviderError, callerTarget, provider, args))
  return providerInstance
}

module.exports = {
  getProvider
}
