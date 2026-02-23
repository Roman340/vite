import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("register/", { username, password });
            alert("Регистрация успешна! Теперь войдите.");
            navigate("/login");
        } catch (error) {
            alert("Ошибка при регистрации");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}