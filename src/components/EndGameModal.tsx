import xIcon from '../assets/close-x.svg';
import type { Player } from '../types/types';

export default function EndGameModal({
  winnerName,
  winnerSymbol,
  closeModal,
  isTie
}: {
  winnerName: string | undefined;
  winnerSymbol: Player;
  closeModal: any;
  isTie: boolean
}) {
  return (
    <div id="end-game-modal">
      <div className="modal-inner">
        {isTie ? (
            <h2>Cat's Game!</h2>
        ) : (
        <h2>
          {winnerName} ({winnerSymbol}) Wins!
        </h2>
        )}
        <img
          onClick={closeModal}
          className="x-icon"
          src={xIcon}
          alt="close icon"
        />
      </div>
    </div>
  );
}
