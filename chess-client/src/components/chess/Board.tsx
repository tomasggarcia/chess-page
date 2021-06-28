import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { Button, Col, Container } from "react-bootstrap";
import './Board.css'
import Timer from "../Timer/Timer";

const Chess = require("chess.js");

const Board: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )

  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();

        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
    }
  }


  const handleReset = () => {
    console.log('cb')
    chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    setFen(chess.fen())

    Timer()

  }

  return (
    <Container className='d-flex justify-content-center border shadow'>
      <Col>
      <Timer></Timer>
      </Col>
      <Col>
        <h1>Random Chess</h1>
        <Chessboard
          width={400}
          position={fen}
          onDrop={(move) =>
            handleMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            })
          }
        />

      </Col>
      <Col>
        <Container className='rounded mt-5 h-75' id='column2Conteiner'>
        <Button onClick={handleReset}>Reiniciar</Button>

        </Container>
      </Col>
    </Container>
  );
};

export default Board;