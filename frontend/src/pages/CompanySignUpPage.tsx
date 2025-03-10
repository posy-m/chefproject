
import styles from '../styles/UserSignupPage.module.css'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import React, { useState } from 'react'

const CompanySignUpPage = () => {
  const [password, setPassword] = useState<string>('')
  const [showPw, setShowPw] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);

  // 비밀번호 조건 검사 (5~20자, 특수기호 포함)
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,20}$/;
    return passwordRegex.test(password);
  };
  return (
    <div className={styles['signup-box']}>
      <span>기업 회원가입</span>
      <div className={styles['signup-wrap']}>
        <input placeholder='기업명' className={styles['default-input']} />
        <div className={styles['signup-doublecheck']}>
          <input placeholder='이메일' className='' />
          <button>중복확인</button>
        </div>
        <div className={styles['signup-doublecheck']}>
          <input placeholder='사업자등록번호' className='' />
          <button>중복확인</button>
        </div>
        <div className={styles['signup-doublecheck']}>
          <input placeholder='휴대폰번호' className='' />
          <button>중복확인</button>
        </div>
        <div className={styles['password-container']}>
          <input placeholder='비밀번호(특수기호 포함 5글자~20글자)' className={styles['default-input']}
            type={showPw ? 'text' : 'password'} required minLength={5} maxLength={20}
            onChange={(e) => setPassword(e.target.value)} value={password} />
          <span onClick={() => setShowPw((prev) => !prev)}>{showPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>
        {!validatePassword(password) && password.length > 0 && (
          <p className={styles['error-feedback']}>비밀번호는 5~20자이며, 특수기호를 포함해주세요</p>
        )}

        <div className={styles['password-container']}>
          <input placeholder='비밀번호 확인' className={styles['default-input']}
            type={showConfirmPw ? 'text' : 'password'} required minLength={5} maxLength={20}
            onChange={(e) => setConfirmPassword(e.target.value)} />
          <span onClick={() => setShowConfirmPw((prev) => !prev)}>{showConfirmPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>
        {confirmPassword && password !== confirmPassword && (<p className={styles['error-feedback']}>비밀번호가 일치하지 않습니다.</p>)}
        {confirmPassword && password === confirmPassword && (<p className={styles['valid-feedback']}>비밀번호가 일치합니다.</p>)}
      </div>
      <button>회원가입</button>
    </div>
  )
}

export default CompanySignUpPage
