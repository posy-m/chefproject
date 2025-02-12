
import './App.css';
import Main from './pages/Main';
import Employment from './pages/Employment';
import { Route, Routes } from "react-router-dom"
import LayOut from './pages/LayOut';
import LgoinPage from './pages/LgoinPage';
import SignupPage from './pages/SignupPage';
import UserSignUpPage from './pages/UserSignUpPage';
import CompanySignUpPage from './pages/CompanySignUpPage';
import UserPage from './pages/UserPage';
import CompanyPage from './pages/CompanyPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path='' element={<LayOut />}>
          <Route path='/' element={<Main />} />
          <Route path="employment" element={<Employment />} />
          <Route path="loginPage" element={<LgoinPage />} />
          <Route path="signupPage" element={<SignupPage />} />
          <Route path="userSignupPage" element={<UserSignUpPage />} />
          <Route path="companySignupPage" element={<CompanySignUpPage />} />
          <Route path='userPage' element={<UserPage />} />
          <Route path='compnayPage' element={<CompanyPage />} />
          <Route path='adminPage' element={<AdminPage />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </div >


  );
}

export default App;


