module.exports = {
  ifEqual: (value1, value2, options) => {
    return (String(value1) === String(value2)) ? 'selected' : ''
  }
}