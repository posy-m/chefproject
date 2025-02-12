import React, { useState } from 'react'
import styles from '../styles/UserSignupPage.module.css'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../zustand/axiosInstance';
import useAuthStore from '../zustand/authStore';

function LgoinPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('')
  const [checkEmailMessage, setCheckEmailMessage] = useState('')
  const [emailValid, setEmailValid] = useState<null | boolean>(null)
  const [password, setPassword] = useState<string>('')
  const [checkPasswordMessage, setCheckPasswordMessage] = useState('')
  const [passwordValid, setPasswordValid] = useState<null | boolean>(null)

  //show pw
  const [showPw, setShowPw] = useState<boolean>(false);
  const setAccessToken = useAuthStore((state) => state.setAuth);

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

  // 로그인 API 호출
  const loginMutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const response = await axiosInstance.post('/login/login', loginData);
      return response.data;
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken, data.userType);
      alert('로그인이 되었습니다.');
      navigate('/');
    },
    onError: (error: any) => {
      // console.error('로그인 에러:', error.response?.data);
      const errorMessage = error.response?.data?.message;

      if (errorMessage === '이메일이 잘못 됨') {
        setEmailValid(false);
        setCheckEmailMessage('이메일을 다시 확인해 주세요');
        setPasswordValid(null);
        setCheckPasswordMessage('');
      } else if (errorMessage === '비밀번호가 잘못 됨') {
        setPasswordValid(false);
        setCheckPasswordMessage('비밀번호를 다시 확인해주세요');
        setEmailValid(true);
      } else {
        setEmailValid(false);
        setPasswordValid(false);
        setCheckEmailMessage('로그인 정보를 확인해 주세요');
        setCheckPasswordMessage('로그인 정보를 확인해 주세요');
      }
    },
  });




  return (
    <div className={styles['signup-box']}>
      <span>로그인</span>
      <div className={styles['signup-wrap']}>
        <input type="text" placeholder='이메일을 입력해 주세요' className={styles['default-input']}
          onChange={(e) => setEmail(e.target.value)} value={email} />
        {!validateEmail(email) && email.length > 0 && (<p className={styles['error-feedback']}>이메일 형식을 다시 확인해주세요</p>)}
        <div className={styles['password-container']}>
          <input type={showPw ? 'text' : 'password'} placeholder='비밀번호를 입력해 주세요' className={styles['default-input']} required minLength={5} maxLength={20}
            onChange={(e) => setPassword(e.target.value)} value={password} />
          <span onClick={() => setShowPw((prev) => !prev)}>{showPw ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}</span>
        </div>
        {!validatePassword(password) && password.length > 0 && (
          <p className={styles['error-feedback']}>비밀번호는 5~20자이며, 특수기호를 포함해야 합니다.</p>
        )}
      </div>
      <button onClick={() => loginMutation.mutate({ email, password })}>로그인</button>
      {emailValid === false && <p className={styles['error-feedback']}>{checkEmailMessage}</p>}
      {passwordValid === false && <p className={styles['error-feedback']}>{checkPasswordMessage}</p>}
      <div>
        <ul>
          <li><Link to='/findId'>아이디 찾기</Link></li>
          <li><Link to='/findPassword'>아이디 찾기</Link></li>
        </ul>
      </div>
    </div>

  )
}

export default LgoinPage
