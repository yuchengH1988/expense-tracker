
function generateIconHTML(category) {
  const icons = {
    '家居物業': '<i class="fas fa-home fa-3x"></i>',
    '交通出行': '<i class="fas fa-shuttle-van fa-3x"></i>',
    '休閒娛樂': '<i class="fas fa-grin-beam fa-3x"></i>',
    '餐飲食品': '<i class="fas fa-utensils fa-3x"></i>',
    '其他': '<i class="fas fa-pen fa-3x"></i>'
  }

  return icons[category]
}

module.exports = generateIconHTML