import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from '../styles/UserSignupPage.module.css'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../zustand/axiosInstance';

const UserSignUpPage = () => {
  const navigate = useNavigate();
  //유효성 검사
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [emailValid, setEmailValid] = useState<null | boolean>(null);
  const [emailMessage, setEmailMessage] = useState('')
  const [phoneValid, setPhoneValid] = useState<null | boolean>(null);
  const [phoneMessage, setPhoneMessage] = useState('')

  //show pw
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);


  //중복확인
  const checkDuplicateMutation = useMutation({
    mutationFn: async (data: { email?: string; phoneNumber?: string }) => {
      const response = await axiosInstance.post(`/login/check-duplicate`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      if (variables.email) {
        setEmailValid(true);
        setEmailMessage('사용 가능한 이메일입니다.');
      }
      if (variables.phoneNumber) {
        setPhoneValid(true);
        setPhoneMessage('사용 가능한 휴대폰 번호입니다.');
      }
    },
    onError: (error, variables) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        if (variables.email) {
          setEmailValid(false);
          setEmailMessage('이미 사용 중인 이메일입니다.');
        }
        if (variables.phoneNumber) {
          setPhoneValid(false);
          setPhoneMessage('이미 사용 중인 휴대폰 번호입니다.');
        }
      } else {
        if (variables.email) {
          setEmailValid(false);
          setEmailMessage('이메일 중복 확인에 실패했습니다.');
        }
        if (variables.phoneNumber) {
          setPhoneValid(false);
          setPhoneMessage('휴대폰 중복 확인에 실패했습니다.');
        }
      }
    }
  });

  // 회원가입 API 호출
  const signUpMutation = useMutation({
    mutationFn: async (userData: { name: string; email: string; phoneNumber: string; password: string; userType: string }) => {
      const response = await axiosInstance.post('/login/usersignup', userData);
      return response.data;
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
      navigate('/loginPage')
    },
    onError: (error) => {
      // console.error("회원가입 에러:", error.message);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  });

  // 회원가입 버튼 활성화 조건
  const isSignUpEnabled = () =>
    name.trim() !== '' &&
    validateEmail(email) &&
    emailValid === true &&
    validatePhone(phoneNumber) &&
    phoneValid === true &&
    validatePassword(password) &&
    password === confirmPassword;


  //휴대혼 번호 유효성 검사
  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^01[0-9]{8,9}$/; // 한국 휴대폰 번호 형식 검사
    return phoneRegex.test(phoneNumber);
  };

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
        <input placeholder='이름' className={styles['default-input']} required onChange={(e) => setName(e.target.value)} value={name} />
        <div className={styles['signup-doublecheck']}>
          <input placeholder='이메일' required onChange={(e) => setEmail(e.target.value)} value={email} />
          <button
            disabled={!validateEmail(email)}
            onClick={() => checkDuplicateMutation.mutate({ email })}>중복확인</button>
        </div>
        {!validateEmail(email) && email.length > 0 && (<p className={styles['error-feedback']}>이메일 형식을 다시 확인해주세요</p>)}
        {emailValid === false && <p className={styles['error-feedback']}>{emailMessage}</p>}
        {emailValid === true && <p className={styles['valid-feedback']}>{emailMessage}</p>}

        <div className={styles['signup-doublecheck']}>
          <input placeholder='휴대폰번호' required maxLength={11} onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} pattern="[0-9]*" />
          <button
            disabled={!validatePhone(phoneNumber)}
            onClick={() => checkDuplicateMutation.mutate({ phoneNumber })}
          >중복확인</button>
        </div>
        {phoneValid === false && <p className={styles['error-feedback']}>{phoneMessage}</p>}
        {phoneValid === true && <p className={styles['valid-feedback']}>{phoneMessage}</p>}


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
      <button
        disabled={!isSignUpEnabled()} onClick={() => signUpMutation.mutate({ name, email, phoneNumber, password, userType: 'personal' })}>회원가입</button>
    </div >
  )
}



export default UserSignUpPage

