import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ResultDetail = () => {
  const { id } = useParams(); // Достает id из URL
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Делаем запрос к Django: GET /api/answers/1/
    api.get(`answers/${id}/`)
      .then(res => setData(res.data))
      .catch(err => setError("Результат не найден или нет доступа"));
  }, [id]);

  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!data) return <div>Загрузка...</div>;

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h2>Детали ответа №{id}</h2>
      <p><strong>Кто ответил:</strong> {data.user_name || "Аноним"}</p>
      {/* Выведи здесь остальные поля твоего ответа */}
      <pre>{JSON.stringify(data, null, 2)}</pre> 
    </div>
  );
};

export default ResultDetail;