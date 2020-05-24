import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import './Link.css';

const Link = props => {
  const {
    location: { state },
    match: {
      params: { roomid }
    }
  } = props;

  // ToDo add ability to change this data
  const [usersData, _setUsersData] = useState(state);

  const handleCopyToClipboard = event => {
    event.preventDefault();
    const newLinkToCopy = `${window.location.href.substring(
      0,
      window.location.href.indexOf('link')
    )}room_link/${roomid}`;
    return navigator.clipboard.writeText(newLinkToCopy);
  };

  return (
    <div className="primary-page">
      <div className="primary-header">
        <h1 className="primary-text">List of wishers</h1>
      </div>
      {usersData.map(({ name, wishes }, index) => (
        <div key={index} className="list-container">
          <span className="wisher-item">{`${index + 1} ${name}`}</span>
          <span className="wisher-item-dark">{wishes}</span>
        </div>
      ))}
      <button className="primary-button" onClick={handleCopyToClipboard}>
        <span>Copy link</span>
        <FontAwesomeIcon className="button-icon" icon={faLink} />
      </button>
    </div>
  );
};

export default Link;
