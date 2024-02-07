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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './signUpForm/signUpForm';
import ExploreHome from './explorePage/exploreHome';
import MatchDetail from './home/OpenMatch';
import Settings from './settings/Settings';
import ExploreNavbar from './explorePage/ExploreNavbar';
import ErrorBoundary from './ErrorBoundary';
const App = () => {
  return (
    <Router>
      <div className='App'>
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/logIn' element={<LogIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route
              path='/profile-info'
              element={
                <>
                  <Navbar />
                  <SignUpForm />
                </>
              }
            />
            <Route path='/match/:userMatchId' element={<MatchDetail />} />
            <Route
              path='/settings'
              element={
                <>
                  <ExploreNavbar />
                  <Settings />
                </>
              }
            />
            <Route path='/explore-home' element={<ExploreHome />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
