import './App.css';
import "./plugins/i18n";
import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomePage, InformationPage, LoginPage, SettingPage, SignUpPage } from './pages';
import PromotionPage from './pages/PromotionPage';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          {/* <Route path='adminlogin' element={<AdminLoginPage />} />  */}
          <Route path='login' element={<LoginPage />} /> 
          <Route path='signup' element={<SignUpPage />} /> 
          <Route path='home' element={<HomePage />} /> 
          <Route path='promotion' element={<PromotionPage />} /> 
          <Route path='information/:account_id?' element={<InformationPage />} /> 
          <Route path='setting' element={<SettingPage />} /> 
          <Route path='*' element={<LoginPage />} /> 
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
