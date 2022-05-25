import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = () => {
      const [loggedInUser, setLoggedInUser] = useContext(userContext);
      let location = useLocation()

      if(!loggedInUser.email){
            return <Navigate to='/login' state={{from : location}}></Navigate>
      }
      return <Outlet></Outlet>
};

export default PrivateRoute;