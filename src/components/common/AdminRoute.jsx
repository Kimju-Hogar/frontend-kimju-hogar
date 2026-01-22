import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return null;
    const isAdmin = user && (user.role === 'admin' || user.role === 'ADMIN');
    return isAdmin ? <Outlet /> : <Navigate to="/404" replace />;
};

export default AdminRoute;
