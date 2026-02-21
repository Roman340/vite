import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Results = () => {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        api.get('surveys/')
            .then(res => setSurveys(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ color: 'white', padding: '20px' }}>
            <h2>📊 Доступные опросы (Админ-панель)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                {surveys.map((item) => ( // Мы называем переменную 'item'
                    <div key={item.id} style={cardStyle}>
                        <h3>{item.title}</h3>
                        <p>Вопросов в базе: {item.questions?.length || 0}</p>
                        
                        {/* ИСПРАВЛЕНИЕ ТУТ: используем item.id и убираем лишний /survey/ */}
                        <Link to={`/results/${item.id}`} style={linkStyle}>
                            Посмотреть список ответов →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Стили, чтобы не было ошибок undefined
const cardStyle = {
    background: '#242424',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #333'
};

const linkStyle = {
    color: '#646cff',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '10px'
};

export default Results;