import '../App.css';
import googleIcon from '../images/google.png'

const SignUp = () => {
  return (
    <div className="full-width-container">
      <div className="LogIn flex-col">
        <h1 id='Sign Up'>Sign Up</h1>
        <input type="text" name="username" id="username" placeholder="username" />
        <input type="password" name="password" id="password" placeholder="password" />
        <input type="password" name="repeatedPassword" id="repeatedPassword" placeholder="repeat password" />
        <input type="email" name="email" id="email" placeholder='your email'/>
        <div className="divider no-background">
              <hr className="divider-line" />
              <span className="divider-text no-background">or</span>
              <hr className="divider-line" />
            </div>
          
            <button className="google-btn">
              <img src={googleIcon} alt="Google" className="google-icon" />
              Continue with Google
            </button>
            <div className="signup-prompt no-background">
              New to stubby? <a href="#" className="signup-link no-background">sign up</a>
            </div>

          
    </div>
    </div>
  );
}

export default SignUp;
