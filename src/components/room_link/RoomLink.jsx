import React, { useState, useEffect } from "react";

const RoomLink = ({
  match: {
    params: { roomid }
  },
  history
}) => {
  const [inputValue, setInputValue] = useState("");
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    fetch(`/api/users?roomid=${roomid}`)
      .then(res => res.json())
      .then(({ users }) => setUsersData(users));
  }, []);

  const handleInputChange = ({ target: { value } }) => {
    return setInputValue(value);
  };

  const handleBecomeClick = async event => {
    event.preventDefault();
    if (!usersData && !usersData.length) {
      alert("Something went wrong!");
    }
    const dbUser = usersData.filter(user => user.username === inputValue)[0];

    if (!dbUser) {
      alert("Something went wrong!");
    } else if (dbUser.is_santa) {
      alert("You are already secret santa!");
    } else {
      history.push({
        pathname: "/secret_room",
        state: { roomid, username: inputValue }
      });
    }
  };

  return (
    <div className="primary-page-room">
      <div className="primary-header mb-250">
        <h1 className="primary-text">Become a Santa!</h1>
      </div>
      <input
        className="primary-input"
        value={inputValue}
        placeholder="Please type name..."
        onChange={handleInputChange}
      />
      <button
        disabled={inputValue <= 0}
        className="primary-button"
        onClick={handleBecomeClick}
      >
        Become a Santa!
      </button>
    </div>
  );
};

export default RoomLink;
