import React, { useState, useEffect } from "react";
import { CircularProgress, Snackbar, SnackbarContent } from "@material-ui/core";

const SANTA_ERRORS = {
  NO_SUCH_USER: "NO_SUCH_USER",
  ALREADY_A_SANTA: "ALREADY_A_SANTA",
};

const RoomLink = ({
  match: {
    params: { roomid },
  },
  history,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [usersData, setUsersData] = useState(null);
  const [santaError, setSantaError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users?roomid=${roomid}`)
      .then((res) => res.json())
      .then(({ users }) => {
        setUsersData(users);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = ({ target: { value } }) => {
    return setInputValue(value);
  };

  const handleBecomeClick = async (event) => {
    event.preventDefault();
    if (!usersData && !usersData.length) {
      alert("Something went wrong!");
    }
    const dbUser = usersData.filter((user) => user.username === inputValue)[0];

    if (!dbUser) {
      setSantaError(SANTA_ERRORS.NO_SUCH_USER);
    } else if (dbUser.is_santa) {
      setSantaError(SANTA_ERRORS.ALREADY_A_SANTA);
    } else {
      history.push({
        pathname: "/secret_room",
        state: { roomid, username: inputValue },
      });
    }
  };

  return isLoading ? (
    <div className="loader-page">
      <CircularProgress size={60} />
    </div>
  ) : (
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
      <Snackbar
        open={santaError === SANTA_ERRORS.NO_SUCH_USER}
        autoHideDuration={3000}
        onClose={() => setSantaError(null)}
      >
        <SnackbarContent message="No such user listed in this room!" />
      </Snackbar>
      <Snackbar
        open={santaError === SANTA_ERRORS.ALREADY_A_SANTA}
        autoHideDuration={3000}
        onClose={() => setSantaError(null)}
      >
        <SnackbarContent message="You are already a santa!" />
      </Snackbar>
    </div>
  );
};

export default RoomLink;
