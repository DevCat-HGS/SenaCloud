import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Service/API/AuthContext';
import Loader from '../loader';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Mostrar loader mientras se verifica la autenticación
  if (loading) {
    return <Loader />;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si hay roles permitidos y el usuario no tiene uno de ellos, redirigir a una página de acceso denegado
  if (allowedRoles && user && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  // Si está autenticado y tiene el rol adecuado, mostrar el componente hijo
  return children;
};

export default ProtectedRoute;