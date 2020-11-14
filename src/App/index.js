import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import Auth from '../components/Auth';
import MyNavbar from '../components/MyNavbar';
import BoardContainer from '../components/BoardContainer';
import Home from '../views/home';
import BoardForm from '../views/boardForm';
import PinDetails from '../views/pinDetails';
import Board from '../views/board';
import PinForm from '../views/pinForm';
import Pins from '../views/pins';
import SingleBoard from '../views/singleBoard';

fbConnection();

class App extends React.Component {
  state = {
    authed: false
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <MyNavbar authed={authed} />
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Home authed={authed} />} />
            <Route
              exact
              path="/boardform"
              component={() => <BoardForm authed={authed} />}
            />
            <Route
              exact
              path="/pindetails"
              component={() => <PinDetails authed={authed} />}
            />
            <Route
              exact
              path="/board"
              component={() => <Board authed={authed} />}
            />
            <Route
              exact
              path="/pinform"
              component={() => <PinForm authed={authed} />}
            />
            <Route
              exact
              path="/pins"
              component={() => <Pins authed={authed} />}
            />
            <Route
              exact
              path="/singleboard"
              component={() => <SingleBoard authed={authed} />}
            />
            <Route component={() => <Home authed={authed} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
