import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from '../styles/UserSignupPage.module.css'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const UserSignUpPage = () => {
  //유효성 검사
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [emailValid, setEmailValid] = useState<null | boolean>(null);
  const [emailMessage, setEmailMessage] = useState('')
  const [phoneValid, setPhoneValid] = useState<null | boolean>(null);

  //show pw
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);

  //이메일, 휴대폰 중복검사
  const checkEmailMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post(`http://localhost:3001/login/check-duplicate`, {
        params: { email }
      });
      return response.data;
    },
    onSuccess: (data) => {
      setEmailValid(true);
      setEmailMessage('사용 가능한 이메일 입니다.');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setEmailValid(false);
        setEmailMessage('이미 사용중인 이메일 입니다.');
      } else {
        setEmailValid(false);
        setEmailMessage('이메일 중복 확인에 실패했습니다.');
        console.log(setEmailMessage, error);

      }
    }
  });

  // 이메일 형식 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 조건 검사 (5~20자, 특수기호 포함)
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,20}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className={styles['signup-box']}>
      <span>개입 회원가입</span>
      <div className={styles['signup-wrap']}>
        <input placeholder='이름' className={styles['default-input']} required />
        <div className={styles['signup-doublecheck']}>
          <input placeholder='이메일' required onChange={(e) => setEmail(e.target.value)} />
          <button
            disabled={!validateEmail(email)}
            onClick={() => checkEmailMutation.mutate(email)}>중복확인</button>
        </div>
        {!validateEmail(email) && email.length > 0 && (<p className={styles['error-feedback']}>이메일 형식을 다시 확인해주세요</p>)}
        {emailValid === false && <p className={styles['error-feedback']}>{emailMessage}</p>}
        {emailValid === true && <p className={styles['valid-feedback']}>{emailMessage}</p>}
        <div className={styles['signup-doublecheck']}>
          <input placeholder='휴대폰번호' required />
          <button>중복확인</button>
        </div>
        <div className={styles['password-container']}>
          <input placeholder='비밀번호(특수기호 포함 5글자~20글자)' className={styles['default-input']} type={showPw ? 'text' : 'password'} required minLength={5} maxLength={20}
            onChange={(e) => setPassword(e.target.value)} />
          <span onClick={() => setShowPw((prev) => !prev)}>{showPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>
        {!validatePassword(password) && password.length > 0 && (
          <p className={styles['error-feedback']}>비밀번호는 5~20자이며, 특수기호를 포함해야 합니다.</p>
        )}
        <div className={styles['password-container']}>
          <input placeholder='비밀번호 확인' className={styles['default-input']} type={showConfirmPw ? 'text' : 'password'} required minLength={5} maxLength={20}
            onChange={(e) => setConfirmPassword(e.target.value)} />
          <span onClick={() => setShowConfirmPw((prev) => !prev)}>
            {showConfirmPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>
        {confirmPassword && password !== confirmPassword && (<p className={styles['error-feedback']}>비밀번호가 일치하지 않습니다.</p>)}
        {confirmPassword && password === confirmPassword && (<p className={styles['valid-feedback']}>비밀번호가 일치합니다.</p>)}
      </div>
      <button>회원가입</button>
    </div >
  )
}



export default UserSignUpPage

