
import './App.css';
import Main from './pages/Main';
import Employment from './pages/Employment';
import { Route, Routes } from "react-router-dom"
import LayOut from './pages/LayOut';
import LgoinPage from './pages/LgoinPage';
import SignupPage from './pages/SignupPage';
import UserSignUpPage from './pages/UserSignUpPage';
import CompanySignUpPage from './pages/CompanySignUpPage';

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
          {/* </Route> */}
        </Route>
      </Routes>
    </div >

  );
}

export default App;


