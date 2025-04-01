import { createSlice } from '@reduxjs/toolkit';
import { calculateValidMoves, checkGameState, createInitialBoard } from '../utils/chessLogic';

const initialState = {
  board: createInitialBoard(),
  currentPlayer: 'white',
  selectedPiece: null,
  validMoves: [],
  capturedPieces: {
    white: [],
    black: [],
  },
  playerNames: {
    player1: "",
    player2: "",
  },
  gameStarted: false,
  moveHistory: [],
  isCheck: false,
  isCheckmate: false,
  lastMove: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    squareClicked: (state, action) => {
      const { row, col } = action.payload;
      const clickedSquare = state.board[row][col];

      // If no piece is selected and clicked square has a piece of current player's color
      if (!state.selectedPiece && clickedSquare && clickedSquare.color === state.currentPlayer) {
        state.selectedPiece = { row, col };
        state.validMoves = calculateValidMoves(state.board, row, col, clickedSquare, state.lastMove);
      }
      // If a piece is selected and clicked square is a valid move
      else if (state.selectedPiece && state.validMoves.some(move => move.row === row && move.col === col)) {
        // Get the piece being moved
        const fromRow = state.selectedPiece.row;
        const fromCol = state.selectedPiece.col;
        const piece = state.board[fromRow][fromCol];
        const capturedPiece = state.board[row][col];

        // Find the valid move that matches the clicked square
        const validMove = state.validMoves.find(move => move.row === row && move.col === col);

        // Create a new board state
        const newBoard = state.board.map(row => [...row]);
        newBoard[row][col] = piece;
        newBoard[fromRow][fromCol] = null;

        // Handle en passant capture
        if (piece.type === "pawn" && validMove.isEnPassant) {
          const { capturedPawn } = validMove;
          newBoard[capturedPawn.row][capturedPawn.col] = null;
          // Store captured pawn in the capturing player's array
          state.capturedPieces[piece.color].push({ 
            type: "pawn", 
            color: piece.color === 'white' ? 'black' : 'white' 
          });
        }
        // Handle regular captures
        else if (capturedPiece) {
          // Store captured piece in the capturing player's array
          state.capturedPieces[piece.color].push(capturedPiece);
        }

        // Handle pawn promotion
        if (piece.type === "pawn" && validMove.isPromotion) {
          newBoard[row][col] = { type: "queen", color: piece.color };
        }

        state.board = newBoard;

        // Update game state
        state.currentPlayer = state.currentPlayer === 'white' ? 'black' : 'white';
        state.selectedPiece = null;
        state.validMoves = [];
        state.lastMove = { from: { row: fromRow, col: fromCol }, to: { row, col }, piece };
        
        // Add move to history
        state.moveHistory.push({
          from: { row: fromRow, col: fromCol },
          to: { row, col },
          piece,
          capturedPiece: validMove.isEnPassant ? 
            { type: "pawn", color: piece.color === 'white' ? 'black' : 'white' } : 
            capturedPiece,
          board: newBoard.map(row => [...row]),
          currentPlayer: state.currentPlayer,
          isCheck: false,
          isCheckmate: false
        });
      }
      // If clicked square is not a valid move, deselect the piece
      else {
        state.selectedPiece = null;
        state.validMoves = [];
      }
    },
    setSelectedPiece: (state, action) => {
      state.selectedPiece = action.payload;
    },
    setValidMoves: (state, action) => {
      state.validMoves = action.payload;
    },
    movePiece: (state, action) => {
      const { from, to } = action.payload;
      const piece = state.board[from.row][from.col];
      const capturedPiece = state.board[to.row][to.col];

      // Create a new board state
      const newBoard = state.board.map(row => [...row]);
      newBoard[to.row][to.col] = piece;
      newBoard[from.row][from.col] = null;

      // Handle en passant capture
      if (piece.type === "pawn" && action.payload.isEnPassant) {
        const { capturedPawn } = action.payload;
        newBoard[capturedPawn.row][capturedPawn.col] = null;
        // Store captured pawn in the capturing player's array
        state.capturedPieces[piece.color].push({ 
          type: "pawn", 
          color: piece.color === 'white' ? 'black' : 'white' 
        });
      }
      // Handle regular captures
      else if (capturedPiece) {
        // Store captured piece in the capturing player's array
        state.capturedPieces[piece.color].push(capturedPiece);
      }

      // Handle pawn promotion
      if (piece.type === "pawn" && action.payload.isPromotion) {
        newBoard[to.row][to.col] = { type: "queen", color: piece.color };
      }

      state.board = newBoard;

      // Update game state
      state.currentPlayer = state.currentPlayer === 'white' ? 'black' : 'white';
      state.selectedPiece = null;
      state.validMoves = [];
      state.lastMove = { from, to, piece };
      
      // Add move to history
      state.moveHistory.push({
        from,
        to,
        piece,
        capturedPiece: action.payload.isEnPassant ? 
          { type: "pawn", color: piece.color === 'white' ? 'black' : 'white' } : 
          capturedPiece,
        board: newBoard.map(row => [...row]),
        currentPlayer: state.currentPlayer,
        isCheck: false,
        isCheckmate: false
      });
    },
    resetGame: (state) => {
      state.board = createInitialBoard();
      state.currentPlayer = 'white';
      state.selectedPiece = null;
      state.validMoves = [];
      state.capturedPieces = { white: [], black: [] };
      state.playerNames = {
        player1: "",
        player2: "",
      };
      state.gameStarted = false;
      state.moveHistory = [];
      state.isCheck = false;
      state.isCheckmate = false;
      state.lastMove = null;
    },
    setCheck: (state, action) => {
      state.isCheck = action.payload;
      if (state.moveHistory.length > 0) {
        state.moveHistory[state.moveHistory.length - 1].isCheck = action.payload;
      }
    },
    setCheckmate: (state, action) => {
      state.isCheckmate = action.payload;
      if (state.moveHistory.length > 0) {
        state.moveHistory[state.moveHistory.length - 1].isCheckmate = action.payload;
      }
    },
    setPlayerNames: (state, action) => {
      state.playerNames = action.payload;
      state.gameStarted = true;
    },
  },
});

export const {
  squareClicked,
  setSelectedPiece,
  setValidMoves,
  movePiece,
  resetGame,
  setCheck,
  setCheckmate,
  setPlayerNames,
} = gameSlice.actions;

export default gameSlice.reducer; 