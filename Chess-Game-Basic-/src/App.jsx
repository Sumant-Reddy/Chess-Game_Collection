import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "./store/gameSlice";
import ChessBoard from "./components/ChessBoard";
import CapturedPieces from "./components/CapturedPieces";
import PlayerNames from "./components/PlayerNames";

function App() {
  const dispatch = useDispatch();
  const { playerNames, gameStarted } = useSelector((state) => state.game);
  const [showPlayerNames, setShowPlayerNames] = useState(!gameStarted);

  const handleGameStart = () => {
    setShowPlayerNames(false);
  };

  return (
    <div className="app">
      <h1>Chess Game</h1>
      {showPlayerNames ? (
        <PlayerNames onStart={handleGameStart} />
      ) : (
        <>
          <div className="player-info">
            <div className="player player1">
              <span className="player-color white"></span>
              <span className="player-name">{playerNames.player1}</span>
            </div>
            <div className="player player2">
              <span className="player-color black"></span>
              <span className="player-name">{playerNames.player2}</span>
            </div>
          </div>
          <div className="game-container">
            <CapturedPieces color="black" />
            <ChessBoard />
            <CapturedPieces color="white" />
          </div>
          <button onClick={() => {
            dispatch(resetGame());
            setShowPlayerNames(true);
          }}>Reset Game</button>
        </>
      )}
    </div>
  );
}

export default App;
