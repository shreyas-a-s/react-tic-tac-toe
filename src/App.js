import { useEffect, useState } from "react"

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={ onSquareClick }>{value}</button>
}

function Board({xIsNext, squares, setSquares, onPlay}) {

  function handleClick(index) {
    // Prevents changing X <-> Y on already marked square
    if (calculateWinner(squares) || squares[index]) {
      return
    }

    const newSquares = squares.slice()
    if (xIsNext) {
      newSquares[index] = "X"
    }
    else {
      newSquares[index] = "O"
    }

    onPlay(newSquares)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => {handleClick(0)}}/>
        <Square value={squares[1]} onSquareClick={() => {handleClick(1)}}/>
        <Square value={squares[2]} onSquareClick={() => {handleClick(2)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => {handleClick(3)}}/>
        <Square value={squares[4]} onSquareClick={() => {handleClick(4)}}/>
        <Square value={squares[5]} onSquareClick={() => {handleClick(5)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => {handleClick(6)}}/>
        <Square value={squares[7]} onSquareClick={() => {handleClick(7)}}/>
        <Square value={squares[8]} onSquareClick={() => {handleClick(8)}}/>
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState(() => {
    const localValue = localStorage.getItem("HISTORY")
    if (localValue == null) return [Array(9).fill(null)]

    return JSON.parse(localValue)
  })

  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  useEffect(() => {
    localStorage.setItem("HISTORY", JSON.stringify(history))
  }, [history])

  function handlePlay(newSquares) {
  const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
  }

  function onResetClick() {
    setHistory([Array(9).fill(null)])
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} setSquares={setHistory} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
      <div className="reset-button">
        <button onClick={ onResetClick }>Reset</button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
