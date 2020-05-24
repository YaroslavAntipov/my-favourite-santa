import React, { useState, useEffect } from "react";
import "./SecretRoom.css";

const SecretRoom = ({
  location: {
    state: { roomid, username }
  }
}) => {
  const [secretInfo, setSecretInfo] = useState(null);

  useEffect(() => {
    fetch("/api/become_santa", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ roomid, username })
    })
      .then(res => res.json())
      .then(({ response }) => setSecretInfo(response));
  }, []);
  
  if (secretInfo && secretInfo.error) {
    return (
      <div className="primary-page">
        <h1 className="primary-text">Shame on you, {username}!</h1>
        <h1 className="primary-text">You are already Santa!</h1>
      </div>
    );
  }
  
  return (
    <div className="primary-page">
      <h1 className="primary-text">Heyy, you became a Secret Santa for</h1>
      <div className="left-panel">
        <span>{secretInfo && secretInfo.username}</span>
      </div>
      <div className="right-panel">
        <span>
          {secretInfo && secretInfo.present
            ? secretInfo.present
            : "Something on your choice!"}
        </span>
      </div>
      <span className="secondary-text">But shh... Don't tell anyone!</span>
      <span className="primary-text">MERRY CHRISTMAS!</span>
    </div>
  );
};

export default SecretRoom;
