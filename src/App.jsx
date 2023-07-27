import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, InformationPage, LoginPage, SettingPage, SignUpPage } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage />} /> 
          <Route path='signup' element={<SignUpPage />} /> 
          <Route path='home' element={<HomePage />} /> 
          <Route path='information' element={<InformationPage />} /> 
          <Route path='setting' element={<SettingPage />} /> 
          <Route path='*' element={<LoginPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;