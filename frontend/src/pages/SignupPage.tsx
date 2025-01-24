import React from 'react'
import styles from '../styles/SignupPage.module.css'
import userImg from '../assets/user.png'
import companyImg from '../assets/company.png'
import { Outlet, useNavigate } from 'react-router-dom'

function SignupPage() {

  const navigate = useNavigate()

  // const goUserSignup = () => {
  //   navigate('/userSignupPage')
  // }

  return (
    <div className={styles['signup-box']}>
      < div className={styles['signup-wrap']} >
        {/* 개인회원 박스 */}
        <div className={styles['signup-clickbox']} >
          <div className={styles['signup-imgbox']}>
            <img src={userImg} alt="" />
            <span>개인 회원</span>
          </div>
          <button onClick={() => navigate('/userSignupPage')}>가입하기</button>
        </div >
        {/* 기업회원 박스 */}
        <div className={styles['signup-clickbox']} >
          <div className={styles['signup-imgbox']}>
            <img src={companyImg} alt="" />
            <span>기업 회원</span>
          </div>
          <button onClick={() => navigate('/companySignupPage')}>가입하기</button>
        </div >
      </div >

    </div >
  )
}

export default SignupPage
