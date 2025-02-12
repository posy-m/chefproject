import React from 'react'
import logo from '../assets/logo.png'
import styles from '../styles/Header.module.css'
import { Link } from 'react-router-dom'
import useAuthStore from '../zustand/authStore'


function Header() {
  const { accessToken, userType } = useAuthStore();

  const getMyPageLink = () => {
    if (userType === 'admin') return '/adminPage';
    if (userType === 'company') return '/companyPage';
    return '/userPage'; // 개인 회원일 경우
  };
  return (
    <header className={styles['header-box']}>
      <nav>
        <ul>
          <li>
            <Link to='/'>
              <img src={logo} alt="logo" />
            </Link>
          </li>
          <li><Link to='employment'>채용</Link></li>
          <li><Link to=''>트렌드</Link></li>
          <li><Link to=''>커뮤니티</Link></li>
        </ul>
        <ul>
          {accessToken ? (
            <li><Link to={getMyPageLink()}>마이페이지</Link></li>
          ) : (
            <>
              <li><Link to='/loginPage'>로그인</Link></li>
              <li><Link to='/signupPage'>회원가입</Link></li>
            </>
          )}
        </ul>
      </nav>
      <div></div>
    </header>
  )
}

export default Header
