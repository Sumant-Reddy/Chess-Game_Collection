import { calculateValidMoves, boardToFEN } from './chessLogic.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import cohere from 'cohere-ai';

// Helper function to get all valid moves for a piece
function getValidMoves(board, row, col, piece) {
  return calculateValidMoves(board, row, col, piece);
}

// Helper function to evaluate a position
function evaluatePosition(board) {
  const pieceValues = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 0
  };

  let score = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const value = pieceValues[piece.type];
        score += piece.color === 'black' ? value : -value;
      }
    }
  }
  return score;
}

// Helper function to get all possible moves for black pieces
function getAllBlackMoves(board) {
  const moves = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === 'black') {
        const validMoves = getValidMoves(board, row, col, piece);
        moves.push(...validMoves.map(move => ({
          from: { row, col },
          to: move
        })));
      }
    }
  }
  return moves;
}

// Initialize AI clients
const initGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
  return apiKey ? new GoogleGenerativeAI(apiKey) : null;
};

const initChatGPT = () => {
  const apiKey = import.meta.env.VITE_CHATGPT_API_KEY || localStorage.getItem('chatgpt_api_key');
  return apiKey ? new OpenAI({ apiKey }) : null;
};

const initCohere = () => {
  const apiKey = import.meta.env.VITE_COHERE_API_KEY || localStorage.getItem('cohere_api_key');
  return apiKey ? cohere.init(apiKey) : null;
};

const initDeepSeek = () => {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || localStorage.getItem('deepseek_api_key');
  return apiKey ? apiKey : null;
};

export const generateAIMove = async (board) => {
  // Get all possible moves for black pieces
  const moves = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === 'black') {
        const validMoves = calculateValidMoves(board, row, col, piece);
        validMoves.forEach(move => {
          moves.push({
            from: { row, col },
            to: move
          });
        });
      }
    }
  }

  // If no valid moves, return null
  if (moves.length === 0) {
    return null;
  }

  // Convert board to FEN notation
  const fen = boardToFEN(board);

  // For now, just return a random move
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  return randomMove;
};

const generateGeminiMove = async (prompt) => {
  const genAI = initGemini();
  if (!genAI) throw new Error('Gemini API key not found');

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const move = response.text().trim();
  return fenToCoordinates(move);
};

const generateChatGPTMove = async (prompt) => {
  const openai = initChatGPT();
  if (!openai) throw new Error('ChatGPT API key not found');

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 10,
  });
  const move = response.choices[0].message.content.trim();
  return fenToCoordinates(move);
};

const generateCohereMove = async (prompt) => {
  const cohereClient = initCohere();
  if (!cohereClient) throw new Error('Cohere API key not found');

  const response = await cohere.generate({
    model: 'command',
    prompt: prompt,
    max_tokens: 10,
  });
  const move = response.body.generations[0].text.trim();
  return fenToCoordinates(move);
};

const generateDeepSeekMove = async (prompt) => {
  const apiKey = initDeepSeek();
  if (!apiKey) throw new Error('DeepSeek API key not found');

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 10,
    }),
  });

  const data = await response.json();
  const move = data.choices[0].message.content.trim();
  return fenToCoordinates(move);
};

// ... rest of the existing code ... 