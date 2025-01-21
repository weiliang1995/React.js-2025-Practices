import { useState } from "react"

export default function Player({ name, symbol, isActive, onChange }) {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ playerName, setPlayerName] = useState(name);

  let editablePlayerName = <span className="player-name">{playerName}</span>

  if (isEditing) {
    editablePlayerName = <input type="text" required defaultValue={playerName}
                          onChange={handleNameChange}/>
  }

  function handleEditClick() {
    setIsEditing((editing)=> !editing);
    if(isEditing){
    onChange(symbol, playerName);
  }
}

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  return <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
  </li>
}