import React, { useContext } from 'react';
import { authContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpiner from '../LoadingSpiner/LoadingSpiner';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user,loading} = useContext(authContext)

    if(loading){
        return <LoadingSpiner></LoadingSpiner>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{form:location}} replace></Navigate>
};

export default PrivateRoute;