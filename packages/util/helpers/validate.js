const { validateProps, PropTypes } = require('prop-validator')

const validateObjectProps = (errorFn, caller, object, props) => {
  const { _type, slug, propTypes, propDefaults = {} } = object
  const res = validateProps(propTypes, props)
  if (!res.isValid) {
    throw errorFn(`${_type} "${slug}" was passed invalid arguments by caller "${caller.slug}":\n${res.errors.map(e => `  - ${e.message}`).join('\n')}`)
  }
  return { ...propDefaults, ...props }
}

module.exports = {
  validateProps,
  validateObjectProps,
  PropTypes
}
