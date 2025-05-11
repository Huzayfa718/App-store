import React, { use, useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({children}) {
    const {user , loading} = use(AuthContext);
    const location = useLocation();
  
   if(loading){
        return <span className='loading loading-spinner loading-xl items-center'></span>
    }


    if(!user){
        return <Navigate state={location?.pathname} to='/login' />;
    }

  return children;
}
