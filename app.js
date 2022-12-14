import { squares } from './utils/constants.js'
import { renderGrid } from './utils/utils.js'
import { handleClick } from './utils/utils.js'
import { validateBattlefield } from './utils/utils.js'

const container = document.querySelector('#container')
const validityBtn = document.querySelector('#validity-btn')
const resultDisplay = document.querySelector('#result-display')

container.append(renderGrid(squares))

const grid = container.querySelector('.grid')

grid.addEventListener('click', (e) => {
  handleClick(e, squares)
})

validityBtn.addEventListener('click', () => {
  resultDisplay.textContent = validateBattlefield(squares)
})
