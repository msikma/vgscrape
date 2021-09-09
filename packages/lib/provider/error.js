// vgscrape-util <https://github.com/msikma/vgscrape>
// © MIT license

const { VgsError } = require('vgscrape-util')

class VgsProviderError extends VgsError {
  constructor(args) {
    super(args)
    this.code = 'VGSCRAPE_PROVIDER_ERROR'
  }
}

const vgsProviderError = (message, originalError) => {
  throw new VgsProviderError({ message, originalError })
}

module.exports = {
  vgsProviderError
}
