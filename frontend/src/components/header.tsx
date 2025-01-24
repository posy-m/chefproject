import React from 'react'
import logo from '../assets/logo.png'
import styles from '../styles/Header.module.css'
import { Link } from 'react-router-dom'


function Header() {
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
          <li><Link to='loginPage'>로그인</Link></li>
          <li><Link to='signupPage'>회원가입</Link></li>
        </ul>
      </nav>
      <div></div>
    </header>
  )
}

export default Header
