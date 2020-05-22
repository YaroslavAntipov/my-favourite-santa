import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Room from './components/room';
import RoomLink from './components/room_link';
import Link from './components/link';
import SecretRoom from './components/secret_room';

const App = (props) => {
  console.log('props', props)
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/room_link/:roomid" component={RoomLink} />
        <Route exact path="/room" component={Room} />
        <Route exact path="/link/:roomid" component={Link} />
        <Route exact path="/secret_room" component={SecretRoom} />
      </Switch>
    </Router>
  );
};

export default App;
