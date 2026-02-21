import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const SurveyAnswersList = () => {
    const { surveyId } = useParams();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        api.get(`answers/?survey=${surveyId}`)
            .then(res => {
                // Группируем ответы по session_id
                const grouped = res.data.reduce((acc, current) => {
                    if (!acc[current.session_id]) {
                        acc[current.session_id] = {
                            username: current.session_id,
                            date: current.created_at,
                            count: 0
                        };
                    }
                    acc[current.session_id].count++;
                    return acc;
                }, {});
                setSubmissions(Object.values(grouped));
            })
            .catch(err => console.error(err));
    }, [surveyId]);

    return (
        <div style={{ color: 'white', padding: '20px' }}>
            <h2>👤 Прохождения опроса №{surveyId}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#333', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Участник</th>
                        <th style={{ padding: '12px' }}>Дата</th>
                        <th style={{ padding: '12px' }}>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((sub) => (
                        <tr key={sub.username} style={{ borderBottom: '1px solid #444' }}>
                            <td style={{ padding: '12px' }}>{sub.username}</td>
                            <td style={{ padding: '12px' }}>{new Date(sub.date).toLocaleString()}</td>
                            <td style={{ padding: '12px' }}>
                                <Link 
                                    to={`/results/session/${sub.username}?survey=${surveyId}`} 
                                    style={{ color: '#646cff', textDecoration: 'none', fontWeight: 'bold' }}
                                >
                                    Смотреть все ответы
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SurveyAnswersList;