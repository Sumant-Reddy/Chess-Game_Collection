# Chess Game Collection

A collection of chess games with different AI implementations and features. This repository contains three different chess game implementations:

1. Chess with LLM (Gemini)
2. Chess with LLMs
3. Chess Game Basic

## Features

### Chess with LLM (Gemini)
- Integration with Google's Gemini AI model
- Advanced AI settings and customization
- Real-time game analysis
- Modern React-based UI
- Redux state management

### Chess with LLms
- Multiple LLM model support
- Customizable AI behavior
- Interactive game interface
- Real-time move validation
- Captured pieces tracking

### Chess Game Basic
- Classic chess implementation
- Two-player mode
- Basic move validation
- Simple and intuitive interface
- Essential chess features

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sumant-Reddy/Chess-Game_Collection.git
cd Chess-Game_Collection
```

2. Choose a game to run and navigate to its directory:
```bash
# For Chess with LLM (Gemini)
cd "Chess With LLM(Gemini)"

# For Chess with LLms
cd "Chess with LLms"

# For Chess Game Basic
cd "Chess-Game-Basic-"
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Project Structure

Each game follows a similar structure:
```
├── src/
│   ├── components/     # React components
│   ├── store/         # Redux store and slices
│   ├── utils/         # Utility functions
│   └── main.jsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML template
└── package.json       # Project dependencies
```

## Technologies Used

- React
- Redux Toolkit
- Vite
- CSS Modules
- JavaScript/JSX

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Chess piece images and assets
- Open-source chess libraries
- AI model providers 