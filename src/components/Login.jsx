import { useState } from 'react';
import api from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Django SimpleJWT ожидает именно 'username' и 'password'
            const res = await api.post('token/', { username, password });
            
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            
            alert("Вход выполнен успешно!");
            window.location.href = '/results'; // Переход к ответам
        } catch (err) {
            console.error(err);
            alert("Ошибка: Неверный логин или пароль");
        }
    };

    return (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
            <h2>Авторизация</h2>
            <form onSubmit={handleLogin} style={{ display: 'inline-block' }}>
                <input 
                    type="text" 
                    placeholder="Логин (username)" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: 'block', margin: '10px 0', padding: '8px' }}
                />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', margin: '10px 0', padding: '8px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '10px' }}>Войти</button>
            </form>
        </div>
    );
};

export default Login;