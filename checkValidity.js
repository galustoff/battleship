function validateBattlefield(field) {
  const shipsControl = {
    battleship: 0,
    cruiser: 0,
    destroyer: 0,
    submarine: 0,
    wrong: 0,
    check() {
      return (
        this.battleship <= 1 &&
        this.cruiser <= 2 &&
        this.destroyer <= 3 &&
        this.submarine <= 4 &&
        this.wrong === 0
      )
    },
    finalCheck() {
      return (
        this.battleship === 1 &&
        this.cruiser === 2 &&
        this.destroyer === 3 &&
        this.submarine === 4 &&
        this.wrong === 0
      )
    }
  }

  function findEnd([startX, startY]) {
    let endX = startX
    let endY = startY

    while (field[startY][endX + 1] === 1) endX++

    if (startX === endX) {
      while (field[endY + 1][endX] === 1) endY++
    }

    return [endX, endY]
  }
}
