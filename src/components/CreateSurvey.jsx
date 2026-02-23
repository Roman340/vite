import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = (type) => {
    setQuestions([...questions, { text: '', question_type: type, choices: [''] }]);
  };

  const handleSave = async () => {
    try {
      await api.post('surveys/', { title, questions });
      alert("Опрос создан!");
      navigate('/my-surveys');
    } catch (err) { alert("Ошибка при создании"); }
  };

  return (
    <div style={{ color: 'white', maxWidth: '600px', margin: '0 auto' }}>
      <h2>📝 Создание нового опроса</h2>
      <input 
        placeholder="Название опроса" 
        style={inputStyle} 
        onChange={e => setTitle(e.target.value)} 
      />
      
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <button onClick={() => addQuestion('text')}>+ Текст</button>
        <button onClick={() => addQuestion('radio')}>+ Один выбор</button>
        <button onClick={() => addQuestion('checkbox')}>+ Много выбора</button>
      </div>

      {questions.map((q, qIdx) => (
        <div key={qIdx} style={cardStyle}>
          <input 
            placeholder="Текст вопроса" 
            style={inputStyle}
            onChange={e => {
              const newQs = [...questions];
              newQs[qIdx].text = e.target.value;
              setQuestions(newQs);
            }} 
          />
          {q.question_type !== 'text' && q.choices.map((c, cIdx) => (
            <input 
              key={cIdx}
              placeholder={`Вариант ${cIdx + 1}`}
              style={{...inputStyle, width: '80%', display: 'block'}}
              onChange={e => {
                const newQs = [...questions];
                newQs[qIdx].choices[cIdx] = e.target.value;
                setQuestions(newQs);
              }}
            />
          ))}
          {q.question_type !== 'text' && (
            <button onClick={() => {
              const newQs = [...questions];
              newQs[qIdx].choices.push('');
              setQuestions(newQs);
            }}>+ Вариант</button>
          )}
        </div>
      ))}
      <button onClick={handleSave} style={saveBtnStyle}>Опубликовать</button>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', background: '#1a1a1a', color: 'white', border: '1px solid #333' };
const cardStyle = { background: '#242424', padding: '15px', borderRadius: '8px', marginBottom: '15px' };
const saveBtnStyle = { width: '100%', padding: '15px', background: '#646cff', color: 'white', fontWeight: 'bold' };

export default CreateSurvey;