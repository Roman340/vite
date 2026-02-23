import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    const addQuestion = (type) => {
        setQuestions([...questions, { 
            text: '', 
            question_type: type, 
            choices: type === 'text' ? [] : [{ text: '' }] 
        }]);
    };

    const updateQuestionText = (index, val) => {
        const newQs = [...questions];
        newQs[index].text = val;
        setQuestions(newQs);
    };

    const addChoice = (qIndex) => {
        const newQs = [...questions];
        newQs[qIndex].choices.push({ text: '' });
        setQuestions(newQs);
    };

    const updateChoiceText = (qIndex, cIndex, val) => {
        const newQs = [...questions];
        newQs[qIndex].choices[cIndex].text = val;
        setQuestions(newQs);
    };

    const handleSave = async () => {
        if (!title) return alert("Введите название опроса");
        try {
            await api.post('surveys/', { title, questions });
            alert("Опрос успешно создан!");
            navigate('/results');
        } catch (err) {
            alert("Ошибка при сохранении");
        }
    };

    return (
        <div style={{ color: 'white', maxWidth: '800px', margin: '0 auto' }}>
            <h1>🛠 Конструктор опроса</h1>
            <input 
                style={inputStyle} 
                placeholder="Название опроса" 
                onChange={e => setTitle(e.target.value)} 
            />

            <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
                <button onClick={() => addQuestion('text')} style={btnStyle}>+ Текст</button>
                <button onClick={() => addQuestion('radio')} style={btnStyle}>+ Один выбор</button>
                <button onClick={() => addQuestion('checkbox')} style={btnStyle}>+ Много выбора</button>
            </div>

            {questions.map((q, qIdx) => (
                <div key={qIdx} style={cardStyle}>
                    <h3>Вопрос №{qIdx + 1} ({q.question_type})</h3>
                    <input 
                        style={inputStyle} 
                        placeholder="Текст вопроса" 
                        value={q.text}
                        onChange={e => updateQuestionText(qIdx, e.target.value)}
                    />

                    {q.question_type !== 'text' && (
                        <div style={{ marginTop: '10px' }}>
                            {q.choices.map((c, cIdx) => (
                                <input 
                                    key={cIdx} 
                                    style={{ ...inputStyle, width: '80%', display: 'inline-block' }}
                                    placeholder={`Вариант ${cIdx + 1}`}
                                    value={c.text}
                                    onChange={e => updateChoiceText(qIdx, cIdx, e.target.value)}
                                />
                            ))}
                            <button onClick={() => addChoice(qIdx)} style={{ marginLeft: '10px' }}>+</button>
                        </div>
                    )}
                </div>
            ))}

            {questions.length > 0 && (
                <button onClick={handleSave} style={saveBtnStyle}>Опубликовать опрос</button>
            )}
        </div>
    );
};

// Стили
const inputStyle = { width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid #444', color: 'white', borderRadius: '5px', marginBottom: '10px' };
const cardStyle = { background: '#242424', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #333' };
const btnStyle = { padding: '10px 20px', cursor: 'pointer', background: '#333', color: 'white', border: '1px solid #555' };
const saveBtnStyle = { ...btnStyle, background: '#646cff', width: '100%', fontSize: '1.2rem' };

export default CreateSurvey;