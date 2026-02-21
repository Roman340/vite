import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access');
    // Если токена нет — отправляем на логин
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;