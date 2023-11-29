import React from 'react';
import './App.css';
import Navbar from './navbar/logInNavbar';
import LogIn from './login/logIn';
import SignUp from './login/signUp';
import Home from './home/home';
import { Route, Switch } from 'wouter';
import ProtectedRoute from './protected/protectedRoutes';
import SignUpForm from './signUpForm/signUpForm';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
        <Route path="/login">
          <Navbar />
          <LogIn />
        </Route>
        <Route path="/signup">
          <Navbar />
          <SignUp />
        </Route>
        <Route path='/profile-info'>
          <Navbar />
          <SignUpForm/> 
        </Route>

        <ProtectedRoute path="/protected" />
      </Switch>
    </div>
  );
}

export default App;
