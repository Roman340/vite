import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import Results from './components/Results';
import SurveyAnswersList from './components/SurveyAnswersList';
import AnswerDetail from './components/AnswerDetail';
import Login from './components/Login';
import Register from "./components/Register"; 
import { ProtectedRoute } from "./components/ProtectedRoute"; 
import CreateSurvey from './components/CreateSurvey';

function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Проверяем наличие токена для отрисовки кнопок
  const isAuthenticated = !!localStorage.getItem('access');

  return (
    <Router>
        <div id='ro'>
          {/* Навигационная панель */}
          <nav style={navStyle}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link to="/results" style={navLinkStyle}>📊 Админ-панель</Link>
              
              {/* Кнопка регистрации видна только гостям */}
              {!isAuthenticated && (
                <Link to="/register" style={registerButtonStyle}>📝 Регистрация</Link>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* Если НЕ вошел — показываем Вход, если вошел — Выход */}
                {!isAuthenticated ? (
                    <Link to="/login" style={navLinkStyle}>Войти</Link>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>Авторизован</span>
                        <button onClick={handleLogout} style={logoutButtonStyle}>
                            Выйти
                        </button>
                    </div>
                )}
            </div>
          </nav>

          {/* Контент страниц */}
          <div className='main'>
            <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/survey/:uid" element={<SurveyForm />} />
                <Route path="/create" element={<ProtectedRoute><CreateSurvey /></ProtectedRoute>} />

                {/* Защищенные роуты */}
                <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
                <Route path="/results/:surveyId" element={<ProtectedRoute><SurveyAnswersList /></ProtectedRoute>} />
                <Route path="/results/session/:sessionId" element={<ProtectedRoute><AnswerDetail /></ProtectedRoute>} />

                <Route path="/" element={<Navigate to="/results" />} />
              </Routes>
            </div>
          </div>
        </div>
    </Router>
  );
}

// --- Стили (добавь/обнови эти константы внизу App.jsx) ---

const navStyle = {
    padding: '15px 40px',
    background: '#111',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
    marginBottom: '20px',
    borderRadius: '5px',
};

const navLinkStyle = {
    color: '#646cff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem'
};

const registerButtonStyle = {
    background: '#333',
    color: 'white',
    textDecoration: 'none',
    padding: '8px 15px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    border: '1px solid #444'
};

const logoutButtonStyle = {
    background: '#ff4b4b',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default App;