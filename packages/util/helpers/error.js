// vgscrape-util <https://github.com/msikma/vgscrape>
// © MIT license

class VgsError extends Error {
  constructor(args) {
    super(args)
    this.code = args.code || 'VGSCRAPE_ERROR'
    this.message = args.message || 'No message available'

    if (args.originalError) {
      console.log('fixme')
      console.log('ORIGINAL ERROR:')
      console.log(args.originalError)
    }
  }
}

module.exports = {
  VgsError
}
