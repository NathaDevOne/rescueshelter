import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdmin=false, children }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    console.log(children.type.name, isAuthenticated, loading, user)
    // let navigate = useNavigate();
      // console.log(isAuthenticated)
    if (isAuthenticated === undefined || isAuthenticated === false) {
        return <Navigate to='/login'  />;
    }

// if (isAdmin === true && user.role !== 'admin') {
//     return <Navigate to='/'  />;
    // }

      return children;
};
export default ProtectedRoute