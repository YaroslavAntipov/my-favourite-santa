import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBullseye, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  CircularProgress,
  SnackbarContent,
  Snackbar,
  Button,
} from "@material-ui/core";
import "./Room.css";

import InputField from "./input_field";

const SANTA_ERRORS = {
  UNIQUE_USERS: "UNIQUE_USERS",
  USERS_NAMES_TYPED: "USERS_NAMES_TYPED",
  ENOUGH_USERS: "ENOUGH_USERS",
  MORE_THAN_MIN_NUMBER: "MORE_THAN_MIN_NUMBER",
  LESS_THAN_MAX_NUMBER: "LESS_THAN_MAX_NUMBER",
};

const Room = ({ history }) => {
  const initialUsers = [
    { name: "", wishes: "", id: 0 },
    { name: "", wishes: "", id: 1 },
    { name: "", wishes: "", id: 2 },
    { name: "", wishes: "", id: 3 },
  ];
  const maxNumberOfUsers = 15;
  const minNumberOfUsers = 3;

  const [usersData, setUsersData] = useState(initialUsers);
  const [santaError, setSantaError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isUsersUnique =
    [...new Set(usersData.map((item) => item.name))].length !==
    usersData.length;
  const isUsersTyped = !!usersData.filter(({ name }) => !name).length;
  const isEnoughUsers = [...new Set(usersData.map((item) => item.name))].length < minNumberOfUsers;

  const handleInputOnChange = (data) => {
    return setUsersData(
      usersData.map((userData) => (userData.id === data.id ? data : userData))
    );
  };

  const handleUserRemove = (index) => (event) => {
    event.preventDefault();

    if (usersData.length <= minNumberOfUsers) {
      return setSantaError(SANTA_ERRORS.MORE_THAN_MIN_NUMBER);
    }

    return setUsersData(
      usersData.filter((usersData) => usersData.id !== index)
    );
  };

  const handlePlusClick = (event) => {
    event.preventDefault();

    if (usersData.length >= maxNumberOfUsers) {
      return setSantaError(SANTA_ERRORS.LESS_THAN_MAX_NUMBER);
    }

    const lastUser = usersData[usersData.length - 1];
    const newUser = {
      name: "",
      wished: "",
      id: lastUser.id + 1,
    };

    return setUsersData([...usersData, newUser]);
  };

  const handleGenerateClick = (event) => {
    event.preventDefault();

    if (isEnoughUsers) {
      return setSantaError(SANTA_ERRORS.MORE_THAN_MIN_NUMBER);
    } else if (isUsersTyped) {
      return setSantaError(SANTA_ERRORS.USERS_NAMES_TYPED);
    } else if (isUsersUnique) {
      return setSantaError(SANTA_ERRORS.UNIQUE_USERS);
    }

    setIsLoading(true);

    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(usersData),
    })
      .then((res) => res.json())
      .then(({ roomid }) => {
        if (roomid) {
          history.push({ pathname: `/link/${roomid}`, state: usersData });
        } else {
          // ToDo error handling
          alert("Something went wrong");
        }
        setIsLoading(false);
      });
  };

  const renderAction = () => (
    <Button
      onClick={(event) => {
        event.preventDefault();
        setSantaError(null);
      }}
    >
      <FontAwesomeIcon className="close-icon" size="2x" icon={faTimes} />
    </Button>
  );

  return isLoading ? (
    <div className="loader-page">
      <CircularProgress size={60} />
    </div>
  ) : (
    <div className="primary-page-room">
      <div className="primary-header">
        <h1 className="primary-text">Create a list of wishers</h1>
      </div>
      <div className="inputs-container">
        {usersData.map((userData, index) => (
          <InputField
            key={index}
            onRemoveClick={handleUserRemove(userData.id)}
            inputOnChange={handleInputOnChange}
            {...userData}
          />
        ))}
        <button onClick={handlePlusClick} className="icon-button">
          <FontAwesomeIcon size="3x" icon={faPlus} />
        </button>
      </div>
      <button onClick={handleGenerateClick} className="primary-button">
        <span>Generate list</span>
        <FontAwesomeIcon className="button-icon" icon={faBullseye} />
      </button>
      <Snackbar
        open={santaError === SANTA_ERRORS.USERS_NAMES_TYPED}
        autoHideDuration={3000}
        onClose={() => setSantaError(null)}
      >
        <SnackbarContent
          message="Users names are required!"
          action={renderAction()}
        />
      </Snackbar>
      <Snackbar
        open={santaError === SANTA_ERRORS.UNIQUE_USERS}
        autoHideDuration={3000}
        onClose={() => setSantaError(null)}
      >
        <SnackbarContent
          message="Users names must be unique!"
          action={renderAction()}
        />
      </Snackbar>
      <Snackbar
        open={santaError === SANTA_ERRORS.MORE_THAN_MIN_NUMBER}
        autoHideDuration={3000}
        onClose={() => setSantaError(null)}
      >
        <SnackbarContent
          message={`Must be more than ${minNumberOfUsers} non-empty users!`}
          action={renderAction()}
        />
      </Snackbar>
      <Snackbar
        open={santaError === SANTA_ERRORS.LESS_THAN_MAX_NUMBER}
        autoHideDuration={3000}
        onClose={() => setSantaError(null)}
      >
        <SnackbarContent
          message={`Must be less than ${maxNumberOfUsers} users!`}
          action={renderAction()}
        />
      </Snackbar>
    </div>
  );
};

export default Room;
