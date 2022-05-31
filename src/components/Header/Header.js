import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
      const [loggedInUser, setLoggedInUser] = useContext(userContext)
      // console.log(loggedInUser);
      return (
            <div className='header'>
                <img src={logo} alt="" /> 
                <nav><Link to="/shop">Shop</Link>
                <Link to="/Order">Order Review</Link>
                <Link to="inventory">Manage Inventory</Link>
                {loggedInUser.displayName && <span style={{color:'yellow'}}>Hello  {loggedInUser.displayName}</span>}
                <button onClick={()=> setLoggedInUser({})}>Logout</button>
                </nav> 
            </div>
      );
};

export default Header;