import React from 'react';
import './styles/animations.css';
import './styles/base.css';
import './styles/components.css';
import './styles/helpers.css';
import './styles/App.css';
import './styles/home.css';
import './styles/signUpForm.css';




import Navbar from './navbar/logInNavbar';
import LogIn from './login/logIn';
import SignUp from './login/signUp';
import Home from './home/home';
import { Route, Switch } from 'wouter';
import ProtectedRoute from './protected/protectedRoutes';
import SignUpForm from './signUpForm/signUpForm';
import ExploreHome from './explorePage/exploreHome';
import MatchDetail from './home/OpenMatch';

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <LogIn />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/profile-info'>
          <Navbar />
          <SignUpForm />
        </Route>
        <Route path='/match/:userMatchId'>
          <MatchDetail />
        </Route>

        <Route path='/explore-home'>
          <ExploreHome />
        </Route>

        <ProtectedRoute path='/protected' />
      </Switch>
    </div>
  );
};

export default App;
