// vgscrape-lib <https://github.com/msikma/vgscrape>
// © MIT license

const { vgsDriverError } = require('./error')

const wrapDriverMethod = (driverManifest, method) => (...args) => {
  try {
    return method(...args)
  }
  catch (err) {
    throw vgsDriverError(`driver "${driverManifest.slug}" error: ${err.message}`, err)
  }
}

module.exports = {
  wrapDriverMethod
}
