import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const SurveyForm = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    api.get(`surveys/${id}/`).then(res => setSurvey(res.data));
  }, [id]);

  const handleSubmit = (e) => {
  e.preventDefault();
  
  const data = Object.keys(answers).map(qId => ({
    question: parseInt(qId),
    text: answers[qId] // Ключ должен быть "text"
  }));

  // ВАЖНО: Проверь, чтобы в конце URL был слэш!
  api.post('answers/', data) 
    .then(() => alert("Ответы сохранены!"))
    .catch(err => console.log("Ошибка валидации:", err.response?.data));
};

  if (!survey) return <div>Загрузка...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{survey.title}</h2>
      {survey.questions.map(q => (
        <div key={q.id} style={{ marginBottom: '10px' }}>
          <p>{q.text}</p>
          <input type="text" onChange={e => setAnswers({...answers, [q.id]: e.target.value})} required />
        </div>
      ))}
      <button type="submit">Отправить</button>
    </form>
  );
};

export default SurveyForm;