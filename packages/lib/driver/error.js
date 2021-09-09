// vgscrape-util <https://github.com/msikma/vgscrape>
// © MIT license

const { VgsError } = require('vgscrape-util')

class VgsDriverError extends VgsError {
  constructor(args) {
    super(args)
    this.code = 'VGSCRAPE_DRIVER_ERROR'
  }
}

const vgsDriverError = (message, originalError) => {
  throw new VgsDriverError({ message, originalError })
}

module.exports = {
  vgsDriverError
}
