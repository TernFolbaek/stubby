import '../App.css';
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
