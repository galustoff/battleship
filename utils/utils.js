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

export function clickHandler(e, arr) {
  const t = e.target

  if (t.classList.contains('square')) {
    const x = t.getAttribute('data-x')
    const y = t.getAttribute('data-y')

    arr[y][x] = +!arr[y][x]

    t.innerText = `${arr[y][x]}`
  }
}
