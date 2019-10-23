import React from 'react';
import {CometChat} from '@cometchat-pro/chat';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';

//import './App.css';
import 'react-notifications/lib/notifications.css';
import Login from './components/Login';
import Call from './components/Call';
let APP_ID="10034cf6a8a5b49";
CometChat.init(APP_ID).then(
  ()=> {
    console.log("Initialization completed successfully");

    // You can now call login function.
  },
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);
// initializeFirebase();

const App = () => {
  // console.log(this.pr)
  return (
    <Router>
      <React.Fragment>
        <NotificationContainer />
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/call'component={Call}/>
      </React.Fragment>
    </Router>
  );
};

export default App;
