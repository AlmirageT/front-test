import { Outlet, Navigate } from 'react-router-dom'
import store from '../store/index'

const protectedRoute = () => {
    const isLoggedIn = store.getState().session.isLoggedIn
    return isLoggedIn ? <Outlet /> : <Navigate to="/login"/>
}

export default protectedRoute