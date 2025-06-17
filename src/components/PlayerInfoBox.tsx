import { useState } from 'react';

export default function PlayerInfoBox({
  names,
  playerOption,
  isActive,
  handleNameChangeInParent
}: {
  names: string[];
  playerOption: 'X' | 'O';
  isActive: boolean,
  handleNameChangeInParent: any
}) {
  const [username, setUsername] = useState(playerOption === 'X' ? names[0] : names[1]);
  const [isEditingName, setIsEditingName] = useState(false);

  function editName() {
    setIsEditingName(prev => !prev);
  }

  const handleNameChange = (event: any) => {
    setUsername(event.target.value);
    handleNameChangeInParent(event.target.value, playerOption)
  };

  let btnText;
  if (isEditingName) {
    btnText = 'save';
  } else {
    btnText = 'edit';
  }

  return (
    <div className={`info-box ${isActive ? 'active-player' : null}`}>
      {isEditingName ? (
        <input
          autoFocus
          className="name-input"
          value={username}
          onChange={handleNameChange}
        />
      ) : (
        <span>{username}</span>
      )}
      <span>{playerOption === 'X' ? '❌' : '⭕'}</span>
      <button className="edit-btn" onClick={editName}>
        {btnText}
      </button>
    </div>
  );
}
