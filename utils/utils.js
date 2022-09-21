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
  // The fleet consists of the types of ships that may be present. Every
  // type contains its name, length and allowed amount, which will decrease
  // as a new ship of corresponding type will appear on the field
  const fleet = [
    {
      name: 'battleship',
      len: 4,
      allowed: 1
    },

    {
      name: 'cruiser',
      len: 3,
      allowed: 2    
    },

    {
      name: 'destroyer',
      len: 2,
      allowed: 3    
    },

    {
      name: 'submarine',
      len: 1,
      allowed: 4    
    }
  ]

  // The common array of coordinates of squares, occupied by all
  // ships on the field. Contains strings like "x3y5"
  let occupiedFields = []
  // The array of errors that may occure, like invalid length
  // of a ship or being of ship in dead zone of another ship etc
  let occuredErrors = []


  /*********************************************************************/
  /*  RUN MAIN CODE                                                    */
  /*********************************************************************/

  checkField(field)
  // Returning the result
  if (occuredErrors.length > 0) {
    return false
  } else {
    return true
  }

  /*********************************************************************/

  /*********************************************************************/


  // Main function goes throw the two-dimension array. If an element
  // is equal to 1, we have to get coordinates string (getCoords(x, y))
  // and check if the array occupiedFields includes it. If so, that
  // means we find a ship which already taken into account, otherwise
  // we find a new ship and have to identify it, check its validity
  // and include it in the fleet
  function checkField(field) {
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x] === 1) {
          const coords = getCoords(x, y)

          if (occupiedFields.includes(coords)) {
            continue
          } else {
            const newShip = identifyShip(x, y)

            if (isShipValid(newShip)/* && isDeadZoneClear(newShip) */) {
              includeShip(newShip)
            } else {
              return
            }
          }
        }
      }
    }

    if (fleet.some(sh => sh.allowed > 0)) {
      occuredErrors.push(new Error('There are not enough of ships on the battlefield!'))
    }
  }


  // This function takes two numbers "x" and "y" and returns a string
  // of coordinates like "x2y3"
  function getCoords(x, y) {
    return `x${x}y${y}`
  }


  // The function creates an object for a new ship and gets its
  // characteristics
  function identifyShip(x, y) {
    const newShip = {
      coords: [],
      dir: null,
      len: 0
    }

    newShip.dir = getShipDirection(x, y)
    newShip.coords = getShipCoords(x, y, newShip.dir)
    newShip.len = getShipLen(newShip)

    return newShip
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


  // The fuction checks validity of a new ship length, identifies
  // its type and checks if amount of this type of ship is allowed
  // on the field
  function isShipValid(newShip) {
    const newShipLen = newShip.len

    if (newShipLen < 1 || newShipLen > 4) {
      occuredErrors.push(new Error(`Wrong length of a ship: ${newShipLen}`))
      return false
    }

    const typeOfShip = fleet.find(i => i.len === newShipLen)

    if (typeOfShip.allowed === 0) {
      occuredErrors.push(new Error(`There are too many ships of type ${typeOfShip.name}`))
      return false
    }

    typeOfShip.allowed -= 1
    return true
  }

  // The function checks if the dead zone of a new ship is not occupied
  // by another ships
  function isDeadZoneClear(newShip) {

  }

  // The fuction takes a new ship into account
  function includeShip(newShip) {
    occupiedFields = occupiedFields.concat(newShip.coords)
  }
}