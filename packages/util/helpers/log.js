// vgscrape-util <https://github.com/msikma/vgscrape>
// © MIT license

const chalk = require('chalk')
const util = require('util')

const { isString } = require('./types')
const { progKill, progName } = require('./program')

// Default logging options.
const logDepth = 6
const logMaxLength = null

// Regex used to colorize certain log patterns.
const HTTP_PROTOCOL = new RegExp('^\s?https?://')
const ABS_REL_PATH = new RegExp('^\s?\.?/')

/** Default options for the logger. */
const loggerDefaults = { logFn: console.log, colorize: true, colorizeAll: null, omitFalsy: false }

/** Returns a dump of the contents of an object. */
const inspectObject = (obj, opts = {}) => {
  return util.inspect(obj, { colors: true, depth: logDepth, maxArrayLength: logMaxLength, ...opts })
}

/**
 * Logs strings and objects to the console.
 *
 * This works similar to console.log() but with a few small changes. Objects are
 * logged more deeply than normal, arrays are fully logged and not truncated,
 * and some types of data are colorized differently.
 * 
 * Alternatively, this function can return the output as a string instead of
 * actually logging it, if the logging function is set to null.
 */
const logSegments = (segments, callerOpts = {}, defaultOpts = loggerDefaults) => {
  const opts = { ...defaultOpts, ...callerOpts }
  const { logFn, colorize, colorizeAll, omitFalsy } = opts

  const loggableSegments = omitFalsy ? segments.filter(s => s) : segments
  const str = loggableSegments.map((s, n) => {
    // Add spaces between items, except after a linebreak.
    const space = (n !== segments.length - 1 && !String(segments[n]).endsWith('\n') ? ' ' : '')

    // Regular strings are colorized and logged directly.
    if (isString(s)) {
      // If this string conforms to a specific type (URL or path), colorize it green.
      if (colorize && (HTTP_PROTOCOL.test(s) || ABS_REL_PATH.test(s))) {
        s = chalk.green(s)
      }
      return s + space
    }

    // Non-string objects are inspected.
    return inspectObject(s) + space
  }).join('')

  // Wrap in colorizer function if the output must be one single color.
  const value = colorizeAll ? colorizeAll(str) : str

  // Either pass the output over to the log function, or return it if none is set.
  return logFn ? logFn(value) : value
}

/** Decorates logSegments() with a set of options. */
const makeLogger = (opts = {}) => (...segments) => {
  return logSegments(segments, opts)
}

/** All basic logging functions. */
const log = makeLogger()
const inspect = makeLogger({ logFn: null })

/** Exits the program with an error. */
const die = (...segments) => {
  if (segments.length) {
    logSegments([`${progName()}:`, ...segments], { logFn: console.error, colorize: false, colorizeAll: chalk.red })
  }
  progKill(1)
}

module.exports = {
  log,
  inspect,
  die
}
