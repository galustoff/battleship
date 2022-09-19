import { squares } from './utils/constants.js'
import { renderGrid } from './utils/utils.js'

const container = document.querySelector('#container')

container.append(renderGrid(squares))
