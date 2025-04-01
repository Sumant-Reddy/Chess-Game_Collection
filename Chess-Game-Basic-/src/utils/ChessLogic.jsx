export function createInitialBoard() {
  const emptyRow = Array(8).fill(null);
  
  return [
    [ // Black's major pieces
      { type: "rook", color: "black" },
      { type: "knight", color: "black" },
      { type: "bishop", color: "black" },
      { type: "queen", color: "black" },
      { type: "king", color: "black" },
      { type: "bishop", color: "black" },
      { type: "knight", color: "black" },
      { type: "rook", color: "black" }
    ],
    Array(8).fill({ type: "pawn", color: "black" }), // Black's pawns
    ...Array(4).fill(emptyRow), // Empty squares
    Array(8).fill({ type: "pawn", color: "white" }), // White's pawns
    [ // White's major pieces
      { type: "rook", color: "white" },
      { type: "knight", color: "white" },
      { type: "bishop", color: "white" },
      { type: "queen", color: "white" },
      { type: "king", color: "white" },
      { type: "bishop", color: "white" },
      { type: "knight", color: "white" },
      { type: "rook", color: "white" }
    ]
  ];
}

// Utility to check if a position is within board limits
const isValidPosition = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

export function calculateValidMoves(board, row, col, piece, lastMove) {
  if (!piece) return [];

  let moves = [];
  const directions = {
    rook: [[1, 0], [-1, 0], [0, 1], [0, -1]],
    bishop: [[1, 1], [-1, -1], [1, -1], [-1, 1]],
    queen: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]],
    king: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]],
    knight: [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]]
  };

  // Knight Moves
  if (piece.type === "knight") {
    for (let [dx, dy] of directions.knight) {
      const newRow = row + dx, newCol = col + dy;
      if (isValidPosition(newRow, newCol) && (!board[newRow][newCol] || board[newRow][newCol].color !== piece.color)) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }

  // Rook, Bishop, Queen Moves
  if (["rook", "bishop", "queen"].includes(piece.type)) {
    for (let [dx, dy] of directions[piece.type]) {
      let newRow = row + dx, newCol = col + dy;
      while (isValidPosition(newRow, newCol)) {
        if (!board[newRow][newCol]) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (board[newRow][newCol].color !== piece.color) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
        newRow += dx;
        newCol += dy;
      }
    }
  }

  // King Moves
  if (piece.type === "king") {
    for (let [dx, dy] of directions.king) {
      const newRow = row + dx, newCol = col + dy;
      if (isValidPosition(newRow, newCol) && (!board[newRow][newCol] || board[newRow][newCol].color !== piece.color)) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }

  // Pawn Moves
  if (piece.type === "pawn") {
    const forward = piece.color === "white" ? -1 : 1;
    const startRow = piece.color === "white" ? 6 : 1;
    const promotionRow = piece.color === "white" ? 0 : 7;

    // Normal forward move
    if (!board[row + forward][col]) {
      moves.push({ row: row + forward, col });

      // Double move from starting position
      if (row === startRow && !board[row + 2 * forward][col]) {
        moves.push({ row: row + 2 * forward, col });
      }
    }

    // Capture diagonally
    for (let side of [-1, 1]) {
      const newCol = col + side;
      if (isValidPosition(row + forward, newCol) && board[row + forward][newCol] && board[row + forward][newCol].color !== piece.color) {
        moves.push({ row: row + forward, col: newCol });
      }
    }

    // En passant
    if (lastMove && lastMove.piece.type === "pawn" && Math.abs(lastMove.from.row - lastMove.to.row) === 2) {
      if (Math.abs(col - lastMove.to.col) === 1 && row === lastMove.to.row) {
        moves.push({ row: row + forward, col: lastMove.to.col });
      }
    }

    // Pawn promotion
    moves = moves.map(move => ({
      ...move,
      isPromotion: move.row === promotionRow
    }));
  }

  return moves;
}

// Check for checkmate or stalemate
export function checkGameState(board, currentPlayer) {
  let kingPosition = null;
  let hasLegalMoves = false;

  // Find the king and check if the current player has legal moves
  board.forEach((row, rowIndex) =>
    row.forEach((square, colIndex) => {
      if (square && square.type === "king" && square.color === currentPlayer) {
        kingPosition = { row: rowIndex, col: colIndex };
      }
      if (square && square.color === currentPlayer) {
        const moves = calculateValidMoves(board, rowIndex, colIndex, square);
        if (moves.length > 0) hasLegalMoves = true;
      }
    })
  );

  if (!hasLegalMoves) {
    return isKingInCheck(board, kingPosition, currentPlayer) ? "checkmate" : "stalemate";
  }
  return "active";
}

// Check if the king is in check
export function isKingInCheck(board, kingPos, currentPlayer) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color !== currentPlayer) {
        const moves = calculateValidMoves(board, row, col, piece);
        if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
          return true;
        }
      }
    }
  }
  return false;
}
