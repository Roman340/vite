import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import Results from './components/Results';
import SurveyAnswersList from './components/SurveyAnswersList';
import AnswerDetail from './components/AnswerDetail';
import Login from './components/Login';
import Register from "./components/Register"; 
import ProtectedRoute from "./components/ProtectedRoute"; // Оставляем один импорт

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
              {/* Заменил 1 на пример UID, либо оставь просто ссылку на список */}
              <Link to="/results" style={navLinkStyle}>📊 Список опросов</Link>
              {!isAuthenticated && (
                <Link to="/register" style={navLinkStyle}>📝 Регистрация</Link>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {!isAuthenticated ? (
                    <Link to="/login" style={navLinkStyle}>Войти</Link>
                ) : (
                    <button onClick={handleLogout} style={logoutButtonStyle}>
                        Выйти
                    </button>
                )}
            </div>
          </nav>

          {/* Контент страниц */}
          <div className='main'>
            <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
              <Routes>
                {/* ПУБЛИЧНЫЕ РОУТЫ */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/survey/:uid" element={<SurveyForm />} />

                {/* ЗАЩИЩЕННЫЕ РОУТЫ (Админка) */}
                <Route 
                  path="/results" 
                  element={
                    <ProtectedRoute>
                      <Results />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/results/:surveyId" 
                  element={
                    <ProtectedRoute>
                      <SurveyAnswersList />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/results/session/:sessionId" 
                  element={
                    <ProtectedRoute>
                      <AnswerDetail />
                    </ProtectedRoute>
                  } 
                />

                {/* Редирект с главной на результаты или логин */}
                <Route path="/" element={<Navigate to="/results" />} />
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