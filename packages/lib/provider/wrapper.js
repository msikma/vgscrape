// vgscrape-lib <https://github.com/msikma/vgscrape>
// © MIT license

const { vgsProviderError } = require('./error')

const wrapProviderMethod = (providerManifest, method) => (...args) => {
  try {
    return method(...args)
  }
  catch (err) {
    throw vgsProviderError(`provider "${providerManifest.slug}" error: ${err.message}`, err)
  }
}

module.exports = {
  wrapProviderMethod
}
