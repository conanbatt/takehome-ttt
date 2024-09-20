import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Howl } from "howler";

// Styled components for board and cells
const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  gap: 5px;
  justify-content: center;
  margin: 20px 0;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const Cell = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  color: red;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Button = styled.button`
  padding: 20px 40px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  pointer-events: none; /* Ensures that the overlay does not block the "Restart" button */
`;

const BoardContainer = styled.div`
  position: relative;
`;

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const end = board.filter((v) => !v).length === 0;
  const nextPlayer = xIsNext ? "X" : "O";

  const setBoardTile = (index) => {
    const newBoard = board.slice();
    newBoard[index] = nextPlayer;
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    playClickSound();
  };

  useEffect(() => {
    const playWinSound = () => {
      const sound = new Howl({
        src: [`/audio/${winner === "X" ? "x" : "circle"}-wins.m4a`],
      });
      sound.play();
    };

    winner && playWinSound(winner);
  }, [winner]);

  console.log("what is next", xIsNext);

  useEffect(() => {
    async function getMove() {
      if (xIsNext || winner) {
        return;
      }

      const response = await fetch("/api/ttt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board,
        }),
      });
      let { move } = await response.json();

      // ChatGPT sometimes gives me invalid moves
      if (board[move]) {
        move = board.findIndex((v) => v !== 0 && !v);
      }
      setBoardTile(move);
    }

    getMove();
  }, [winner, xIsNext, board]);

  const handleClick = (index) => {
    if (winner || board[index] || !xIsNext) return;
    setBoardTile(index);
  };

  const playClickSound = () => {
    const sound = new Howl({
      src: ["/audio/ping.m4a"],
    });
    sound.play();
  };

  console.log("board", board);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: 32, marginTop: 30 }}>Tic-Tac-Toe</h1>
      <BoardContainer>
        <Board disabled={!!winner}>
          {board.map((cell, i) => (
            <Cell
              key={i}
              onClick={() => handleClick(i)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {cell}
            </Cell>
          ))}
        </Board>
        {winner && <Overlay>Winner: {winner}</Overlay>}
        {end && !winner && <Overlay>Tie!</Overlay>}
      </BoardContainer>
      <Button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setXIsNext(true);
        }}
      >
        Restart
      </Button>
    </div>
  );
};

// Logic to calculate winner remains the same
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
