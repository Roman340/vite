import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const SurveyForm = () => {
  const { uid } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    api.get(`surveys/${uid}/`).then(res => setSurvey(res.data));
  }, [uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = Object.keys(answers).map(qId => ({
      question: parseInt(qId),
      text: Array.isArray(answers[qId]) ? answers[qId].join(", ") : answers[qId]
    }));

    api.post('answers/', data) 
      .then(() => alert("Ответы успешно сохранены!"))
      .catch(err => console.log("Ошибка отправки:", err.response?.data));
  };

  if (!survey) return <div style={{color: 'white', textAlign: 'center'}}>Загрузка...</div>;

  return (
    <div style={{ color: 'white', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>{survey.title}</h2>
      <p style={{ color: '#888' }}>{survey.description}</p>
      
      <form onSubmit={handleSubmit}>
        {survey.questions.map(q => (
          <div key={q.id} style={questionContainerStyle}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{q.text} {q.required && "*"}</p>
            
            {/* 1. ТЕКСТОВЫЙ ОТВЕТ */}
            {q.question_type === 'text' && (
              <input 
                type="text" 
                style={inputStyle}
                placeholder="Введите ваш ответ..."
                required={q.required}
                onChange={e => setAnswers({...answers, [q.id]: e.target.value})} 
              />
            )}

            {/* 2. ОДИНОЧНЫЙ ВЫБОР (RADIO) */}
            {q.question_type === 'radio' && q.choices?.map(choice => (
              <label key={choice.id} style={labelStyle}>
                <input 
                  type="radio" 
                  name={`question-${q.id}`} 
                  value={choice.text}
                  required={q.required}
                  onChange={e => setAnswers({...answers, [q.id]: e.target.value})}
                /> {choice.text}
              </label>
            ))}

            {/* 3. МНОЖЕСТВЕННЫЙ ВЫБОР (CHECKBOX) */}
            {q.question_type === 'checkbox' && q.choices?.map(choice => (
              <label key={choice.id} style={labelStyle}>
                <input 
                  type="checkbox" 
                  value={choice.text}
                  onChange={e => {
                    const currentList = answers[q.id] || [];
                    const newList = e.target.checked 
                      ? [...currentList, choice.text]
                      : currentList.filter(item => item !== choice.text);
                    setAnswers({...answers, [q.id]: newList});
                  }}
                /> {choice.text}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" style={submitButtonStyle}>Отправить ответы</button>
      </form>
    </div>
  );
};

// --- Стили ---
const questionContainerStyle = {
  background: '#242424',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  border: '1px solid #333'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  background: '#1a1a1a',
  color: 'white',
  border: '1px solid #444',
  borderRadius: '5px'
};

const labelStyle = {
  display: 'block',
  margin: '10px 0',
  cursor: 'pointer'
};

const submitButtonStyle = {
  width: '100%',
  padding: '15px',
  background: '#646cff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default SurveyForm;