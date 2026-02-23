import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("access");
    if (!token) {
        // Если токена нет, отправляем на логин
        return <Navigate to="/login" />;
    }
    return children;
};