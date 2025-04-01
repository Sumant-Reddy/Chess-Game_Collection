import React from 'react';
import { useSelector } from 'react-redux';
import ChessPiece from './ChessPiece';

const CapturedPieces = ({ color }) => {
  const { playerNames, capturedPieces } = useSelector((state) => state.game);
  const playerName = color === 'white' ? playerNames.player1 : playerNames.player2;

  // Count the number of captured pieces
  const capturedCount = capturedPieces[color].length;

  return (
    <div className="captured-pieces">
      <h3>{playerName}'s Captures: ({capturedCount})</h3>
      <div className="captured-pieces-list">
        {capturedPieces[color].map((piece, index) => (
          <div key={index} className="captured-piece" data-color={piece.color}>
            <ChessPiece type={piece.type} color={piece.color} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapturedPieces; 