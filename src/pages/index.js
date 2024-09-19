import React, { useState, useEffect } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const nextPlayer = xIsNext ? "X" : "O";

  useEffect(() => {
    winner && playEnd(winner === "X");
  }, [winner]);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = board.slice();
    newBoard[index] = nextPlayer;
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    playClickSound();
  };

  const playClickSound = () => {
    const audio = new Audio("/audio/ping.m4a"); // path to the sound file in public folder
    audio.play();
  };

  const playEnd = (win) => {
    const audio = new Audio(`/audio/you-${win ? "win" : "lose"}.m4a`); // path to the sound file in public folder
    audio.play();
  };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <div style={styles.board}>
        {board.map((cell, i) => (
          <div key={i} style={styles.cell} onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>
      <h3>{winner ? `Winner: ${winner}` : `Next Player: ${nextPlayer}`}</h3>
      <button onClick={() => setBoard(Array(9).fill(null))}>Restart</button>
    </div>
  );
};

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

const styles = {
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    gap: "5px",
  },
  cell: {
    width: "100px",
    height: "100px",
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    cursor: "pointer",
  },
};

export default App;
