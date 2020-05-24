import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";

import "./SecretRoom.css";

const SecretRoom = ({
  location: {
    state: { roomid, username },
  },
}) => {
  const [secretInfo, setSecretInfo] = useState({
    error: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isSanta = localStorage.getItem("isSanta") === "true";

    if (!isSanta) {
      fetch("/api/become_santa", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ roomid, username }),
      })
        .then((res) => res.json())
        .then(({ response }) => {
          localStorage.setItem("isSanta", true);
          setSecretInfo(response);
          setIsLoading(false);
        });
    } else {
      setSecretInfo({ error: true });
    }
  }, []);

  if (secretInfo && secretInfo.error) {
    return (
      <div className="primary-page">
        <h1 className="primary-text">Shame on you, {username}!</h1>
        <h1 className="primary-text">You are already a Santa!</h1>
      </div>
    );
  }

  return isLoading ? (
    <div className="loader-page">
      <CircularProgress size={60} />
    </div>
  ) : (
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
