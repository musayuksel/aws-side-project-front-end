import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './homePage';
import './App.css';
import { AddCategory, ConfirmUserPage, LoginPage } from './pages';

const App = () => {
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/add" element={<AddCategory />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirm" element={<ConfirmUserPage />} />
        <Route
          path="/home"
          element={isAuthenticated() ? <HomePage /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
