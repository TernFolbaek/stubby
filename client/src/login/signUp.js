import '../App.css';
import googleIcon from '../images/google.png';

const SignUp = () => {
  return (

<div className='fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50'>



      <div className='LogIn flex-col'>
        <h1 id='SignUp'>Sign Up</h1>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='username'
        />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='password'
        />
        <input
          type='password'
          name='repeatedPassword'
          id='repeatedPassword'
          placeholder='repeat password'
        />
        <input type='email' name='email' id='email' placeholder='your email' />
        <div className='divider no-background'>
          <hr className='divider-line' />
          <span className='divider-text no-background'>or</span>
          <hr className='divider-line' />
        </div>

        <button className='google-btn'>
          <img src={googleIcon} alt='Google' className='google-icon' />
          Continue with Google
        </button>
      
      </div>

    </div>


  );
};

export default SignUp;
