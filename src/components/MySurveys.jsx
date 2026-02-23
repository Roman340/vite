import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const MySurveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    api.get('surveys/').then(res => setSurveys(res.data));
  }, []);

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h2>📂 Мои созданные опросы</h2>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {surveys.map(s => (
          <div key={s.id} style={{ background: '#242424', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
            <h3>{s.title}</h3>
            <p style={{ color: '#888' }}>ID: {s.uuid}</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Link to={`/survey/${s.uuid}`} style={{ color: '#646cff' }}>🔗 Ссылка для прохождения</Link>
              <Link to={`/results/${s.uuid}`} style={{ color: '#4caf50' }}>📊 Результаты</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySurveys;