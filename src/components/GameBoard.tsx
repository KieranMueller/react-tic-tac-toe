import { useEffect, useState } from 'react';
import GameTile from './GameTile';
import type { Player } from '../types/types';

type CellValue = null | 'X' | 'O';
const emptyBoard: CellValue[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({
  activePlayer,
  handleChangeTurn,
  handleEndGame,
}: {
  activePlayer: Player;
  handleChangeTurn: any;
  handleEndGame: any;
}) {
  const [thisActivePlayer, setThisActivePlayer] = useState(activePlayer);
  const [gameState, setGameState] = useState<CellValue[][]>(emptyBoard);

  const handleClick = (row: number, column: number) => {
    const option = thisActivePlayer === 'X' ? 'X' : 'O';
    setGameState(prev => {
      const prevCopy = [...prev.map(innerArr => [...innerArr])];
      prevCopy[row][column] = option;
      return prevCopy;
    });
    setThisActivePlayer(prev => (prev === 'X' ? 'O' : 'X'));
    let rowCopy = 0;
    switch (row) {
      case 0: {
        rowCopy = 3;
        break;
      }
      case 1: {
        rowCopy = 2;
        break;
      }
      case 2: {
        rowCopy = 1;
        break;
      }
    }
    const location = `(${column + 1}, ${rowCopy})`;
    handleChangeTurn(location);
  };

  useEffect(() => {
    for (let i = 0; i < 3; i++)
      checkWin(gameState[i][0], gameState[i][1], gameState[i][2]);
    for (let i = 0; i < 3; i++)
      checkWin(gameState[0][i], gameState[1][i], gameState[2][i]);
    checkWin(gameState[0][0], gameState[1][1], gameState[2][2]);
    checkWin(gameState[0][2], gameState[1][1], gameState[2][0]);
  }, [gameState]);

  function checkWin(a: string | null, b: string | null, c: string | null) {
    if (a && a === b && a === c) {
      resetGame()
    }
  }

  function resetGame() {
    setGameState(emptyBoard);
    setThisActivePlayer('X');
    handleEndGame();
  }

  return (
    <div>
      <div className="board">
        {gameState.map((outerArrEl, outerIdx) => {
          return outerArrEl.map((innerArrEl, innerIdx) => {
            return (
              <GameTile
                key={outerIdx + '' + innerIdx}
                row={outerIdx}
                column={innerIdx}
                handleClick={(row: number, column: number) =>
                  handleClick(row, column)
                }
                status={innerArrEl}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
