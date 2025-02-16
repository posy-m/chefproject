import React, { useState } from 'react'
import styles from '../../styles/UserSignupPage.module.css'


const FindPassword = () => {

  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')


  // 이메일 형식 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //휴대혼 번호 유효성 검사
  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^01[0-9]{8,9}$/; // 한국 휴대폰 번호 형식 검사
    return phoneRegex.test(phoneNumber);
  };



  return (
    <div className={styles['signup-box']}>
      <span>비밀번호 찾기</span>
      <div className={styles['signup-wrap']}>
        <input type="text" placeholder='이메일을 입력해주세요' className={styles['default-input']} onChange={(e) => setEmail(e.target.value)} />
        {!validateEmail(email) && email.length > 0 && (
          <p className={styles['error-feedback']}>이메일 형식을 확인해주세요</p>)}
        <input type="text" placeholder='휴대폰번호를 입력해주세요' className={styles['default-input']} required maxLength={11} pattern="[0-9]*" onChange={(e) => setPhoneNumber(e.target.value)} />
        {!validatePhone(phoneNumber) && phoneNumber.length > 0 && (
          <p className={styles['error-feedback']}>양식을 다시 확인해주세요</p>
        )}

      </div>
      <button >비밀번호 변경</button>

    </div>
  )
}

export default FindPassword
