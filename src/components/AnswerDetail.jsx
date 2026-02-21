import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';

const AnswerDetail = () => {
    const { sessionId } = useParams();
    const [searchParams] = useSearchParams();
    const surveyId = searchParams.get('survey');
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`answers/?session=${sessionId}&survey=${surveyId}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [sessionId, surveyId]);

    if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Загрузка...</div>;

    return (
        <div style={{ color: 'white', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <button 
                onClick={() => navigate(-1)} 
                style={{ background: 'none', border: 'none', color: '#646cff', cursor: 'pointer', fontSize: '1rem', marginBottom: '20px' }}
            >
                ← Вернуться к списку
            </button>

            <h2 style={{ marginBottom: '10px' }}>Результаты участника: {sessionId}</h2>
            <p style={{ color: '#888', marginBottom: '30px' }}>Опрос №{surveyId}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.map((item, index) => (
                    <div key={item.id} style={cardStyle}>
                        <p style={labelStyle}>Вопрос {index + 1}:</p>
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>
                            {/* Если бэкенд настроен верно, тут будет текст вопроса */}
                            {item.question_text || `Загрузка текста вопроса... (ID: ${item.question})`} 
                        </p>
                        
                        <div style={answerBoxStyle}>
                            <strong style={{color: '#646cff'}}>Ответ:</strong> 
                            <p style={{marginTop: '5px', lineHeight: '1.5'}}>{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Стили для компонента ---
const cardStyle = {
    background: '#242424',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #333',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const labelStyle = {
    color: '#888',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px'
};

const answerBoxStyle = {
    background: '#1a1a1a',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #646cff'
};

export default AnswerDetail;