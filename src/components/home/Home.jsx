import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './Home.css';

const Home = () => {
  const match = useRouteMatch();
  return (
    <div className="primary-page">
      <h1 className="welcome-title">Welcome</h1>
      <span className="primary-text">to the Secret Santa's home!</span>
      <Link to={`${match.url}room`} className="primary-button">
        <span>Create my list!</span>
        <FontAwesomeIcon className="button-icon" icon={faAngleRight} />
      </Link>
      <span className="secondary-text">Enjoy the simpliest and the fastest way to generate list for Secret Santa!</span>
      <span className="primary-text">Merry Christmas!</span>
    </div>
  );
};

export default Home;
