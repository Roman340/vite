import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Шлем данные на бэкенд
            await api.post("register/", { username, password });
            alert("Регистрация успешна! Теперь войдите.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Ошибка при регистрации. Возможно, имя пользователя занято.");
        }
    };

    return (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
            <h2>Создать аккаунт</h2>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', background: '#242424', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Придумайте логин" 
                    style={inputStyle}
                    required
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Придумайте пароль" 
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>Зарегистрироваться</button>
            </form>
        </div>
    );
}

const inputStyle = {
    display: 'block',
    width: '100%',
    margin: '10px 0',
    padding: '12px',
    background: '#1a1a1a',
    border: '1px solid #444',
    borderRadius: '6px',
    color: 'white'
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: '#646cff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px'
};

export default Register;