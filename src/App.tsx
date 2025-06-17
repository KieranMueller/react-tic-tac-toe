import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import PlayerInfoBox from './components/PlayerInfoBox';
import type { Player } from './types/types';
import MoveHistory from './components/MoveHistory';
import EndGameModal from './components/EndGameModal';

function App() {
  const [activePlayer, setActivePlayer] = useState<Player>('X');
  const [playerNames, setPlayerNames] = useState<string[]>([
    'Player 1',
    'Player 2',
  ]);
  const [moveHistory, setMoveHistory] =
    useState<{ player: Player; location: string; time: string }[]>();
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<{
    name: string | undefined;
    symbol: Player;
  }>();

  function handleChangeTurn(locationOfMove: string) {
    const now = new Date();
    setActivePlayer(prev => (prev === 'X' ? 'O' : 'X'));
    setMoveHistory(prev => [
      ...(prev || []),
      {
        player: activePlayer === 'X' ? 'X' : 'O',
        location: locationOfMove,
        time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}s`,
      },
    ]);
  }

  function resetGame() {
    setWinner({
      name: activePlayer === 'X' ? playerNames[1] : playerNames[0],
      symbol: activePlayer === 'X' ? 'O' : 'X',
    });
    setIsGameOver(true);
    setActivePlayer('X');
    setMoveHistory([]);
  }

  const handleUsernameChange = (newName: string, player: Player) => {
    if (player === 'X') {
      setPlayerNames(prev => [newName, prev[1]]);
    }
    if (player === 'O') {
      setPlayerNames(prev => [prev[0], newName]);
    }
  };

  return (
    <div className="container">
      {isGameOver && (
        <EndGameModal
          winnerName={winner!.name}
          winnerSymbol={winner!.symbol}
          closeModal={() => setIsGameOver(false)}
        />
      )}
      <div className="infos">
        <PlayerInfoBox
          isActive={activePlayer === 'X'}
          names={playerNames}
          playerOption="X"
          handleNameChangeInParent={(newName: string, player: Player) =>
            handleUsernameChange(newName, player)
          }
        />
        <PlayerInfoBox
          isActive={activePlayer === 'O'}
          names={playerNames}
          playerOption="O"
          handleNameChangeInParent={handleUsernameChange}
        />
      </div>
      <GameBoard
        activePlayer={activePlayer}
        handleChangeTurn={handleChangeTurn}
        handleEndGame={resetGame}
      />
      {moveHistory
        ?.map(move => {
          return (
            <MoveHistory
              player={move.player}
              location={move.location}
              time={move.time}
            />
          );
        })
        .reverse()}
    </div>
  );
}

export default App;
