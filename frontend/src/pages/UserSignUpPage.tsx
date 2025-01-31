import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from '../styles/UserSignupPage.module.css'

const UserSignUpPage = () => {

  const [showPw, setShowPw] = useState<boolean>(false);
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);

  return (
    <div className={styles['signup-box']}>
      <span>개입 회원가입</span>
      <div className={styles['signup-wrap']}>
        <input placeholder='이름' className={styles['default-input']} required />
        <div className={styles['signup-doublecheck']}>
          <input placeholder='닉네임 6글자이내' maxLength={6} required />
          <button>중복확인</button>
        </div>
        <div className={styles['signup-doublecheck']}>
          <input placeholder='이메일' required />
          <button>중복확인</button>
        </div>
        <div className={styles['signup-doublecheck']}>
          <input placeholder='휴대폰번호' required />
          <button>중복확인</button>
        </div>
        <div className={styles['password-container']}>
          <input placeholder='비밀번호(특수기호 포함 5글자~20글자)' className={styles['default-input']} type={showPw ? 'text' : 'password'} required minLength={5} maxLength={20} />
          <span onClick={() => setShowPw((prev) => !prev)}>{showPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>
        <div className={styles['password-container']}>
          <input placeholder='비밀번호 확인' className={styles['default-input']} type={showConfirmPw ? 'text' : 'password'} required minLength={5} maxLength={20} />
          <span onClick={() => setShowConfirmPw((prev) => !prev)}>
            {showConfirmPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>


      </div>
      <button>회원가입</button>
    </div>
  )
}



export default UserSignUpPage

