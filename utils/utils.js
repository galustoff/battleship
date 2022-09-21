export function renderGrid(arr) {
  const grid = createDiv('grid')

  for (let lnIdx = 0; lnIdx < arr.length; lnIdx++) {
    const squareLine = createDiv('square-line')

    for (let sqIdx = 0; sqIdx < arr[lnIdx].length; sqIdx++) {
      const square = createDiv('square')

      square.setAttribute('data-x', `${sqIdx}`)
      square.setAttribute('data-y', `${lnIdx}`)
      square.innerText = getValueFromMtx(arr, sqIdx, lnIdx)

      squareLine.append(square)
    }

    grid.append(squareLine)
  }

  return grid
}

function getValueFromMtx(mtx, x, y) {
  return mtx[y][x]
}

function createDiv(userClass) {
  const div = document.createElement('div')

  div.classList.add(userClass)

  return div
}

export function handleClick(e, arr) {
  const t = e.target

  if (t.classList.contains('square')) {
    const x = +t.getAttribute('data-x')
    const y = +t.getAttribute('data-y')

    t.textContent = +!arr[y][x]
    arr[y][x] = +t.textContent
    t.classList.toggle('square_selected')
  }
}

export function createMtx(size = 2, content = 0) {
  const mtx = []

  for (let i = 0; i < size; i++) {
    mtx.push(createMtxLine(size, content))
  }

  function createMtxLine(size, content) {
    const mtxLine = []

    for (let i = 0; i < size; i++) {
      mtxLine.push(content)
    }

    return mtxLine
  }

  return mtx
}

export function validateBattlefield(field) {
  // The types of ships that may be present. Contains length,
  // allowed amount and amount in fact.
  const battleship = {
    len: 4,
    allowed: 1,
    present: 0
  }

  const cruiser = {
    len: 3,
    allowed: 2,
    present: 0
  }

  const destroyer = {
    len: 2,
    allowed: 3,
    present: 0
  }

  const submarine = {
    len: 1,
    allowed: 4,
    present: 0
  }

  // The common array of coordinates of squares, occupied by ships
  // Contains strings like "x3y5"
  let occupiedFields = []
  // The array of errors that may occure, like invalid length
  // of a ship or being of ship in dead zone of another ship etc
  let occuredErrors = []

  // Running main function
  checkField(field)

  // TEST PRINT
  console.log('occupiedFiels: \n', occupiedFields)

  // Main function goes throw the two-dimension array. If an element
  // is equal to 1, we have to get coordinates string (getCoords(x, y))
  // and check if the array occupiedFields includes it. If so, that
  // means we find a ship which already taken in to account, otherwise
  // we find a new ship and have to identify it.
  function checkField(field) {
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x] === 1) {
          const coords = getCoords(x, y)

          if (occupiedFields.includes(coords)) {
            continue
          } else {
            identifyShip(x, y)
          }
        }
      }
    }
  }

  // This function takes two numbers "x" and "y" and returns a string
  // of coordinates like "x2y3"
  function getCoords(x, y) {
    return `x${x}y${y}`
  }

  function identifyShip(x, y) {
    // TEST PRINT
    console.log(`A new ship detected in square: ${getCoords(x, y)}`)

    // Defining an object for the new ship
    const newShip = {
      coords: [],
      dir: null,
      len: 0
    }

    newShip.dir = getShipDirection(x, y)
    newShip.coords = getShipCoords(x, y, newShip.dir)
    newShip.len = getShipLen(newShip)

    occupiedFields = occupiedFields.concat(newShip.coords)

    // TEST PRINT
    console.log('newShip: \n', newShip)
  }

  // The function determs direction of a new ship: vertical or
  // horizontal
  function getShipDirection(x, y) {
    return field[y][x + 1] === 0 ? 'ver' : 'hor'
  }

  // The function returns an array of coordinates of a new ship
  function getShipCoords(x, y, dir) {
      const coords = []

      do {
        coords.push(getCoords(x, y))
        
        if (dir === 'hor') {
          x++
        } else if (dir === 'ver') {
          y++
        }

      } while (y < 10 && field[y][x] === 1)

      return coords
  }

  // The function returns the length of a new ship
  function getShipLen({coords, dir}) {
    const idx = dir === 'hor' ? 1 : 3

    return (coords[coords.length - 1][idx] - coords[0][idx]) + 1
  }
}