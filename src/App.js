import { useEffect, useState } from "react"

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={ onSquareClick }>{value}</button>
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(() => {
    const localValue = localStorage.getItem("SQUARES")
    if (localValue == null) return Array(9).fill(null)

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("SQUARES", JSON.stringify(squares))
  }, [squares])


  function handleClick(index) {
    // Prevents changing X <-> Y on already marked square
    if (squares[index]) {
      return
    }

    const newSquares = squares.slice()
    if (xIsNext) {
      newSquares[index] = "X"
    }
    else {
      newSquares[index] = "O"
    }

    setXIsNext(!xIsNext)
    setSquares(newSquares)
  }

  function onResetClick() {
    setSquares(Array(9).fill(null))
  }

  return (
    <>
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
      <div className="reset-button">
        <button onClick={ onResetClick }>Reset</button>
      </div>
    </>
  )
}
