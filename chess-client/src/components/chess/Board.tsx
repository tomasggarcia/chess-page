import React, { useRef, useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { Button, Col, Container } from "react-bootstrap";
import "./Board.css";
import Timer from "../Timer/Timer";

const Chess = require("chess.js");

const Board: React.FC = () => {
    const [turn, setTurn] = useState("white");
    const [chess] = useState<ChessInstance>(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    const [timeSelected, setTimeSelected] = useState(false);

    const [additionalTime, setAdditionalTime] = useState(0);
    const [initialTime, setInitialTime] = useState(60);
    const [fen, setFen] = useState(chess.fen());

    const [timerW, setTimerW] = useState(initialTime);
    const incrementW = useRef<any>();

    const [timerB, setTimerB] = useState(initialTime);
    const incrementB = useRef<any>();

    //COMPUTER MOVES HANDLING
    const handleMove = (move: ShortMove) => {
        if (chess.move(move)) {
            if (turn === "white") {
                setTimerW(timerW + additionalTime);
                handleBlackStart();
                handleWhitePause();
                console.log("white moved, black timer starts");
                setTurn("black");
            } else {
                setTimerB(timerB + additionalTime);
                setTurn("white");
                handleWhiteStart();
                handleBlackPause();
                console.log("black moved, white timer starts");
            }
            // setTimeout(() => {
            //     const moves = chess.moves();
            //     if (moves.length > 0) {
            //         const computerMove =
            //             moves[Math.floor(Math.random() * moves.length)];
            //         chess.move(computerMove);
            //         setFen(chess.fen());
            //     }
            // }, 300);
            setFen(chess.fen());
            setTimeout(() => {
                if (chess.game_over()) {
                    if (turn === "white") {
                        gameFinished("white");
                    } else {
                        gameFinished("black");
                    }
                }
            }, 5);
        }
    };

    const handleReset = () => {
        console.log("cb");
        chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        setFen(chess.fen());
        handleWhiteReset();
        handleBlackReset();
        setTurn("white");
        setTimeSelected(false);
        // Timer()
    };

    const handleWhiteStart = () => {
        incrementW.current = setInterval(() => {
            setTimerW((timer) => timer - 1);
        }, 1000);
    };

    const handleWhitePause = () => {
        clearInterval(incrementW.current);
    };

    const handleWhiteReset = () => {
        clearInterval(incrementW.current);
        setTimerW(initialTime);
    };

    const handleBlackStart = () => {
        incrementB.current = setInterval(() => {
            setTimerB((timerB) => timerB - 1);
        }, 1000);
    };

    const handleBlackPause = () => {
        clearInterval(incrementB.current);
    };

    const handleBlackReset = () => {
        clearInterval(incrementB.current);
        setTimerB(initialTime);
    };

    const formatTimeW = () => {
        const getSeconds = `0${timerW % 60}`.slice(-2);
        const minutes: any = `${Math.floor(timerW / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timerW / 3600)}`.slice(-2);

        if (timerW === 0) {
            gameFinished("black");
        }
        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    };

    const formatTimeB = () => {
        const getSeconds = `0${timerB % 60}`.slice(-2);
        const minutes: any = `${Math.floor(timerB / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timerB / 3600)}`.slice(-2);

        if (timerB === 0) {
            gameFinished("white");
        }

        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    };

    const handleTimeSelect = (minutes: number, increment: number) => {
        setTimeSelected(true);

        setAdditionalTime(increment);

        setTimerB(minutes * 60);
        setTimerW(minutes * 60);
        setInitialTime(minutes * 60);
    };

    function gameFinished(winner: string) {
        alert(`game ended, ${winner} won!`);
        handleBlackReset();
        handleReset();
        setTurn("white");
        setTimeSelected(false);
    }

    return (
        <div>
            <h1>Random Chess</h1>
            <Container className="d-flex justify-content-center border shadow">
                <div className="container">
                    <div className="board">
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
                    </div>
                    <div className="reset">
                        <p>{turn} to move</p>
                        <Button onClick={handleReset}>Reiniciar</Button>
                    </div>
                    <div className="timer-white">
                        <p>{formatTimeW()}</p>

                        {/* {!isActiveW && !isPausedW ? (
                    <button onClick={handleWhiteStart}>Start</button>
                    ) : isPausedW ? (
                        <button onClick={handleWhitePause}>Pause</button>
                        ) : (
                            <button onClick={handleWhiteResume}>Resume</button>
                            )}
                            <button onClick={handleWhiteReset} disabled={!isActiveW}>
                            Reset
                        </button> */}
                    </div>

                    <div className="timer-black">
                        <p>{formatTimeB()}</p>

                        {/* {!isActiveB && !isPausedB ? (
                    <button onClick={handleBlackStart}>Start</button>
                    ) : isPausedB ? (
                        <button onClick={handleBlackPause}>Pause</button>
                        ) : (
                            <button onClick={handleBlackResume}>Resume</button>
                            )}
                            <button onClick={handleBlackReset} disabled={!isActiveB}>
                            Reset
                        </button> */}
                    </div>
                    <div className="buttons">
                        {timeSelected ? null : (
                            <div>
                                <Button
                                    onClick={() => {
                                        handleTimeSelect(1, 1);
                                    }}
                                >
                                    1 | 1
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleTimeSelect(5, 5);
                                    }}
                                >
                                    5 | 5
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleTimeSelect(10, 0);
                                    }}
                                >
                                    10
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Board;
