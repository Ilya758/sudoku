module.exports = function solveSudoku(matrix) {
  const matrixLength = 9;
  const quadrantSize = 3;

  const isEmpty = (matrix) => {
    for (let row = 0; row < matrixLength; row++) {
      for (let col = 0; col < matrixLength; col++) {
        if (matrix[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  const validateCell = (num, position, matrix) => {
    const [row, col] = position;

    for (let i = 0; i < matrixLength; i++) {
      if (matrix[i][col] === num && i !== row) {
        return false;
      }
    }

    for (let i = 0; i < matrixLength; i++) {
      if (matrix[row][i] === num && i !== col) {
        return false;
      }
    }
    const quadrantInRow = Math.floor(row / quadrantSize) * quadrantSize;
    const quadrantInCol = Math.floor(col / quadrantSize) * quadrantSize;

    for (let i = quadrantInRow; i < quadrantInRow + quadrantSize; i++) {
      for (let j = quadrantInCol; j < quadrantInCol + quadrantSize; j++) {
        if (matrix[i][j] === num && i !== row && j !== col) {
          return false;
        }
      }
    }
    return true;
  }

  const solve = () => {
    const currPosition = isEmpty(matrix);

    if (!currPosition) return true;

    for (let i = 1; i <= matrixLength; i++) {
      const isValid = validateCell(i, currPosition, matrix);

      if (isValid) {
        const [x, y] = currPosition;
        matrix[x][y] = i;

        if (solve()) {
          return true;
        }
        matrix[x][y] = 0;
      }
    }
    return false;
  }
  solve();
  return matrix;
}
