import './App.css';
import Navbar from './navbar/logInNavbar';
import LogIn from './login/logIn';
import SignUp from './login/signUp';
import { Route, Switch, Link } from 'wouter';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      </Switch>
      


      

    </div>
  );
}

export default App;
