function tenPercentile(num) {
  num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num
}

module.exports = tenPercentile