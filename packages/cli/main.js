// vgscrape <https://github.com/msikma/vgscrape>
// © MIT license

const { getProvider } = require('vgscrape-lib')

const main = () => {
  const p = getProvider('liquipedia')
  console.log(p)
}

module.exports = {
  main
}
