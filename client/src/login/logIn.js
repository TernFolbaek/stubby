import '../App.css';

const LogIn = () => {
  return (
    <div className="full-width-container">
      <div className="LogIn flex-col">
        <h1 id='LogIn'>Log In</h1>
        <input type="text" name="username" id="username" placeholder="Username" />
        <input type="password" name="password" id="password" placeholder="Password" />

          <div className="divider no-background">
              <hr className="divider-line" />
              <span className="divider-text no-background">or</span>
              <hr className="divider-line" />
            </div>
          
            <button className="google-btn">
              <img src="../images/google.png" alt="Google" className="google-icon" />
              Continue with Google
            </button>
            <div className="signup-prompt no-background">
              New to stubby? <a href="#" className="signup-link no-background">sign up</a>
            </div>
    </div>
    </div>
  );
}

export default LogIn;
