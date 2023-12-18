import '../styles/App.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/helpers.css';
import '../styles/animations.css';
import {Link} from 'wouter';
const Navbar = () => {
  return (
    <div className="Navbar">
        <Link to='/' > 
            <h1 className='cursor-pointer italic glow'>Stubby</h1>
        </Link>
    </div>
  );
}

export default Navbar;
