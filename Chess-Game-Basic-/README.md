# Chess Game

A modern, interactive chess game built with React and Redux. This application provides a complete chess experience with player names, captured pieces tracking, and a beautiful user interface.

## Features

- 🎮 Interactive chess board with all piece movements
- 👥 Player name customization at game start
- 🎯 Visual indicators for valid moves and captures
- 📊 Captured pieces tracking with player-specific displays
- 🔄 Game reset functionality
- 🎨 Modern, responsive design
- 🎯 Special moves support:
  - Pawn promotion
  - En passant
  - Castling
  - Check and checkmate detection

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chess-game.git
cd chess-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
chess-game/
├── src/
│   ├── components/
│   │   ├── ChessBoard.jsx
│   │   ├── ChessPiece.jsx
│   │   ├── CapturedPieces.jsx
│   │   └── PlayerNames.jsx
│   ├── store/
│   │   ├── gameSlice.js
│   │   └── store.js
│   ├── utils/
│   │   └── chessLogic.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
└── README.md
```

## Features in Detail

### Player Names
- Players can enter their names at the start of the game
- Names are displayed with color indicators (white/black)
- Names persist throughout the game session

### Game Interface
- Interactive chess board with piece movement
- Visual indicators for:
  - Selected pieces
  - Valid moves
  - Captured pieces
- Player-specific captured pieces display
- Game reset button

### Chess Logic
- Complete chess rules implementation
- Special moves support
- Turn-based gameplay
- Move validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Technologies Used

- React
- Redux Toolkit
- CSS3
- Vite

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Chess piece icons from [Chess Icons](https://github.com/lichess-org/lila/tree/master/public/piece)
- Inspired by classic chess games and modern web applications

## Contact

Your Name - [@linkedIn](https://www.linkedin.com/in/sumanthreddyvaddi/) - vaddisumanthreddy@gmail.com

Project Link: [https://github.com/Sumant-Reddy/Chess-Game-Basic-](https://github.com/Sumant-Reddy/Chess-Game-Basic-) 
