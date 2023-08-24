import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, InformationPage, LoginPage, SettingPage, SignUpPage } from './pages';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='adminlogin' element={<AdminLoginPage />} /> 
          <Route path='login' element={<LoginPage />} /> 
          <Route path='signup' element={<SignUpPage />} /> 
          <Route path='home' element={<HomePage />} /> 
          <Route path='information/:account_id?' element={<InformationPage />} /> 
          <Route path='setting' element={<SettingPage />} /> 
          <Route path='*' element={<LoginPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
