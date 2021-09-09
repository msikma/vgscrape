// vgscrape-lib <https://github.com/msikma/vgscrape>
// © MIT license

const { drivers } = require('vgscrape-drivers')
const { validateObjectProps } = require('vgscrape-util')
const { vgsDriverError } = require('./error')
const { wrapDriverMethod } = require('./wrapper')

/** Drivers are stored here after they're decorated. */
const initialized = {}

const initDriver = (slug, callerProvider = {}) => {
  if (!drivers[slug]) throw new Error(`driver "${slug}" does not exist: requested by provider "${callerProvider.slug}"`)
  if (initialized[slug]) return initialized[slug]

  const manifest = drivers[slug]

  try {
    driver = { ...manifest }
    driver._type = 'driver'
    for (const [name, fn] of Object.entries(driver.module)) {
      driver.module[name] = wrapDriverMethod(manifest, fn)
    }
    initialized[slug] = driver
    return driver
  }
  catch (err) {
    initialized[slug] = null
    throw vgsDriverError(`failed to initialize driver "${slug}": requested by provider "${callerProvider.slug}"`, err)
  }
}

const getDriver = (slug, args, callerProvider) => {
  const driver = initDriver(slug, callerProvider)
  const driverInstance = driver.module.initInstance(driver, validateObjectProps(vgsDriverError, callerProvider, driver, args))
  return driverInstance
}

module.exports = {
  drivers,
  getDriver
}
