import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import Results from './components/Results';
import SurveyAnswersList from './components/SurveyAnswersList';
import AnswerDetail from './components/AnswerDetail';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const isAuthenticated = !!localStorage.getItem('access');

  return (
    
    <Router>
        <div id='ro'>
          {/* Навигационная панель */}
          <nav style={navStyle}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link to="/survey/1" style={navLinkStyle}>🔥 Пройти опрос</Link>
              <Link to="/results" style={navLinkStyle}>📊 Админ-панель</Link>
            </div>
            
            {isAuthenticated && (
              <button onClick={handleLogout} style={logoutButtonStyle}>
                Выйти
              </button>
            )}
          </nav>

          {/* Контент страниц */}
          <div className='main'>
          <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <Routes>
              <Route path="/survey/:id" element={<SurveyForm />} />
              <Route path="/login" element={<Login />} />

              {/* УРОВЕНЬ 1: Список всех опросов */}
              <Route 
                path="/results" 
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } 
              />

              {/* УРОВЕНЬ 2: Список сессий (участников) конкретного опроса */}
              <Route 
                path="/results/:surveyId" 
                element={
                  <ProtectedRoute>
                    <SurveyAnswersList />
                  </ProtectedRoute>
                } 
              />

              {/* УРОВЕНЬ 3: Полный отчет Вопрос-Ответ по конкретной сессии */}
              <Route 
                path="/results/session/:sessionId" 
                element={
                  <ProtectedRoute>
                    <AnswerDetail />
                  </ProtectedRoute>
                } 
              />

              <Route path="/" element={<Navigate to="/survey/1" />} />
            </Routes>
          </div>
          </div>
        </div>
    </Router>
    
  );
}



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