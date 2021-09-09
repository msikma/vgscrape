// vgscrape-util <https://github.com/msikma/vgscrape>
// © MIT license

/** Returns the name of the currently running program. */
const progName = () => (
  path.basename(process.argv[1])
)

/** Exits the program with a given exit code. */
const progKill = (exitCode = 0) => {
  process.exit(exitCode)
}

module.exports = {
  progName,
  progKill
}
