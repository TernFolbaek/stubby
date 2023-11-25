import React from 'react';
import './App.css';
import Navbar from './navbar/logInNavbar';
import LogIn from './login/logIn';
import SignUp from './login/signUp';
import Home from './home/home';
import { Route, Switch, useLocation } from 'wouter';
import ProtectedRoute from './protected/protectedRoutes';

const App = () => {
  const [location] = useLocation();

  return (
    <div className="App">
      {(location === '/login' || location === '/signup') && <Navbar />}
      <Switch>
        <Route path='/' component={Home}/>
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />

        <ProtectedRoute>

        </ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
