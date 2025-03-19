import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import styles from '../../styles/UserSignupPage.module.css'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function ChangePassword() {
  const location = useLocation()
  const resetToken = location.state?.resetToken;
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  //show pw
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);

  // 비밀번호 조건 검사 (5~20자, 특수기호 포함)
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,20}$/;
    return passwordRegex.test(password);
  };


  if (!resetToken) {
    alert('비정상적인 접근입니다.')
    return <Navigate to="/findPassword" />
  }
  return (
    <div className={styles['signup-box']}>
      <span>비밀번호 변경</span>
      <div className={styles['signup-wrap']}>
        <div className={styles['password-container']}>
          <input placeholder='비밀번호(특수기호 포함 5글자~20글자)' className={styles['default-input']} type={showPw ? 'text' : 'password'} required minLength={5} maxLength={20}
            onChange={(e) => setPassword(e.target.value)} value={password} />
          <span onClick={() => setShowPw((prev) => !prev)}>{showPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>
        {!validatePassword(password) && password.length > 0 && (
          <p className={styles['error-feedback']}>비밀번호는 5~20자이며, 특수기호를 포함해야 합니다.</p>
        )}

        <div className={styles['password-container']}>
          <input placeholder='비밀번호 확인' className={styles['default-input']} type={showConfirmPw ? 'text' : 'password'} required minLength={5} maxLength={20}
            onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
          <span onClick={() => setShowConfirmPw((prev) => !prev)}>
            {showConfirmPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>
        {confirmPassword && password !== confirmPassword && (<p className={styles['error-feedback']}>비밀번호가 일치하지 않습니다.</p>)}
        {confirmPassword && password === confirmPassword && (<p className={styles['valid-feedback']}>비밀번호가 일치합니다.</p>)}
      </div>
      <button>비밀번호 변경</button>
    </div>
  )
}

export default ChangePassword
