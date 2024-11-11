import { useCallback, useEffect, useMemo, useState } from "react";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

// get the winner
function calculateWinner(squares, setWinner) {
  lines.forEach((arr) => {
    const circleWins = arr.every((cell) => squares[cell] === "O");
    if (circleWins) {
      setWinner("Circle");
      return;
    }
    const crossWins = arr.every((cell) => squares[cell] === "X");
    if (crossWins) {
      setWinner("Cross");
      return;
    }
  });

  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  //states
  const [xIsNext, setXIsNext] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("Start");

  const calcWinner = useCallback(() => calculateWinner(squares, setWinner), []);

  function handleClick(i) {
    if (squares[i] || calcWinner(squares, setWinner)) {
      return;
    }

    if (!xIsNext) {
      squares[i] = "X";
    } else {
      squares[i] = "O";
    }

    calcWinner(squares, setWinner);
    setSquares(squares);
    setXIsNext(!xIsNext);
  }

  const updateStatus = () => {
    if (winner) {
      setStatus(`Congratulations ${winner} wins`);
    } else {
      setStatus("Next Player: " + (xIsNext ? "X" : "O"));
    }
  };

  useEffect(() => {
    if (squares === !null) {
      return setStatus;
    } else if (winner) {
      setStatus(`Congratulations ${winner} wins`);
      calcWinner(squares, setWinner);
    }
  }, [winner]);

  return (
    <>
      <div className="container">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquareClick={() => (handleClick(0), updateStatus())}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => (handleClick(1), updateStatus())}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => (handleClick(2), updateStatus())}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquareClick={() => (handleClick(3), updateStatus())}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => (handleClick(4), updateStatus())}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => (handleClick(5), updateStatus())}
          />
        </div>

        <div className="board-row">
          <Square
            value={squares[6]}
            onSquareClick={() => (handleClick(6), updateStatus())}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => (handleClick(7), updateStatus())}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => (handleClick(8), updateStatus())}
          />
        </div>
      </div>
    </>
  );
}
