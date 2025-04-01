# Chess Player vs Multiple LLMs

A sophisticated chess game that allows players to compete against various AI language models including GPT-4, Gemini, Cohere, and Deepseek. This project combines traditional chess gameplay with state-of-the-art AI capabilities.

## Features

- Play chess against multiple AI language models:
  - OpenAI's GPT-4
  - Google's Gemini
  - Cohere
  - Deepseek
- Beautiful and intuitive user interface
- Real-time move validation
- Game history tracking
- Multiple difficulty levels
- Save and load game states

## Prerequisites

- Python 3.8+
- Required Python packages (install via pip):
  ```bash
  pip install -r requirements.txt
  ```
- API keys for:
  - OpenAI (for GPT-4)
  - Google AI (for Gemini)
  - Cohere
  - Deepseek

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sumant-Reddy/Chess-Player-Vs-Multiple-LLM-s-.git
   cd Chess-Player-Vs-Multiple-LLM-s-
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your environment variables:
   ```bash
   # Create a .env file and add your API keys
   OPENAI_API_KEY=your_openai_key
   GOOGLE_API_KEY=your_google_key
   COHERE_API_KEY=your_cohere_key
   DEEPSEEK_API_KEY=your_deepseek_key
   ```

## Usage

1. Start the game:
   ```bash
   python main.py
   ```

2. Select your opponent (GPT-4, Gemini, Cohere, or Deepseek)

3. Choose the game settings:
   - Difficulty level
   - Time control (if applicable)
   - Board orientation

4. Play your moves using the graphical interface

## Game Features

- **Multiple AI Opponents**: Each AI model has its unique playing style and strategy
- **Real-time Analysis**: Get move suggestions and position evaluation
- **Game History**: Review and analyze your past games
- **Save/Load**: Continue your games later
- **Training Mode**: Improve your skills with AI assistance

## Project Structure

```
├── src/
│   ├── models/         # AI model integrations
│   ├── chess/          # Chess game logic
│   ├── ui/            # User interface components
│   └── utils/         # Utility functions
├── tests/             # Test cases
├── resources/         # Game resources
├── requirements.txt   # Project dependencies
└── README.md         # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Chess engine core based on [python-chess](https://python-chess.readthedocs.io/)
- UI components inspired by modern chess platforms
- Special thanks to the AI model providers:
  - OpenAI
  - Google
  - Cohere
  - Deepseek

## Contact

Sumant Reddy - [@YourTwitter](https://twitter.com/YourTwitter)

Project Link: [https://github.com/Sumant-Reddy/Chess-Player-Vs-Multiple-LLM-s-](https://github.com/Sumant-Reddy/Chess-Player-Vs-Multiple-LLM-s-)

## Future Enhancements

- Support for additional AI models
- Multiplayer functionality
- Advanced analysis features
- Tournament mode
- Mobile app version