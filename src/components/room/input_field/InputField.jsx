import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './InputField.css';

const InputField = ({ inputOnChange, onRemoveClick, ...userData }) => {
  const { name, wishes } = userData;

  const onChange = type => ({ target: { value } }) => {
    inputOnChange({ ...userData, [type]: value });
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="primary-input"
        placeholder="Name"
        value={name}
        onChange={onChange('name')}
      />
      <input
        type="text"
        className="primary-input"
        placeholder="Wishes"
        value={wishes}
        onChange={onChange('wishes')}
      />
      <button className="icon-button" onClick={onRemoveClick}>
        <FontAwesomeIcon className="remove-icon" size="2x" icon={faTimes} />
      </button>
    </div>
  );
};

export default InputField;
