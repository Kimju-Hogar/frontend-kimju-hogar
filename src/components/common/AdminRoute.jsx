import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotFound from '../../pages/NotFound';

const AdminRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return null;
    const isAdmin = user && (user.role === 'admin' || user.role === 'ADMIN');
    return isAdmin ? <Outlet /> : <NotFound />;
};

export default AdminRoute;
