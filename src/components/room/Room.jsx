import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBullseye } from "@fortawesome/free-solid-svg-icons";
import "./Room.css";

import InputField from "./input_field";

const Room = ({ history }) => {
  const initialUsers = [
    { name: "", wishes: "", id: 0 },
    { name: "", wishes: "", id: 1 },
    { name: "", wishes: "", id: 2 },
    { name: "", wishes: "", id: 3 }
  ];
  const maxNumberOfUsers = 10;
  const minNumberOfUsers = 3;
  
  const [usersData, setUsersData] = useState(initialUsers);

  const isGenerateButtonDisabled = !!usersData.filter(({ name }) => !name)
    .length || usersData.length < minNumberOfUsers;

  const handleInputOnChange = data => {
    return setUsersData(
      usersData.map(userData => (userData.id === data.id ? data : userData))
    );
  };

  const handleUserRemove = index => event => {
    event.preventDefault();

    return setUsersData(usersData.filter(usersData => usersData.id !== index));
  };

  const handlePlusClick = event => {
    event.preventDefault();

    const lastUser = usersData[usersData.length - 1];
    const newUser = {
      name: "",
      wished: "",
      id: lastUser.id + 1
    };

    return setUsersData([...usersData, newUser]);
  };

  const handleGenerateClick = event => {
    event.preventDefault();

    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(usersData)
    })
      .then(res => res.json())
      .then(({ roomid }) => {
        if (roomid) {
          history.push({ pathname: `/link/${roomid}`, state: usersData });
        } else {
          // ToDo error handling
          alert("Something went wrong");
        }
      });
  };

  return (
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
        <button
          onClick={handlePlusClick}
          disabled={usersData.length > maxNumberOfUsers}
          className="icon-button"
        >
          <FontAwesomeIcon size="3x" icon={faPlus} />
        </button>
      </div>
      <button
        onClick={handleGenerateClick}
        disabled={isGenerateButtonDisabled}
        className="primary-button"
      >
        <span>Generate list</span>
        <FontAwesomeIcon className="button-icon" icon={faBullseye} />
      </button>
    </div>
  );
};

export default Room;
