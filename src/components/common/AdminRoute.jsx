import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotFound from '../../pages/NotFound';

const AdminRoute = () => {
    const { user, loading } = useAuth();

    console.log("AdminRoute Debug Check:", { user, role: user?.role, loading }); // DEBUG: Check what is actually happening

    if (loading) return null; // Or a loading spinner

    // Strict check for admin role
    const isAdmin = user && (user.role === 'admin' || user.role === 'ADMIN');
    return isAdmin ? <Outlet /> : <NotFound />;
};

export default AdminRoute;
