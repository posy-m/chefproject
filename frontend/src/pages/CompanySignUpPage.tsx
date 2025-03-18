
import styles from '../styles/UserSignupPage.module.css'
import { AiFillEye, AiFillEyeInvisible, AiFillLayout } from 'react-icons/ai';
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../zustand/axiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanySignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPw, setShowPw] = useState<boolean>(false);
  const [phoneNumber, setphoneNumber] = useState('')
  const [businessNumber, setBusinessNumber] = useState<string>('')

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showConfirmPw, setShowConfirmPw] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<null | boolean>(null);
  const [emailMessage, setEmailMessage] = useState('')
  const [businessNumberValid, setBusinessNumberValid] = useState<null | boolean>(null);
  const [businessNumberMessage, setBusinessNumberMessage] = useState('')
  const [phoneNumberValid, setPhoneNumberValid] = useState<null | boolean>(null);
  const [phoneNumberMessage, setPhoneNumberMessage] = useState('')

  // 이메일, 사업자등록, 휴대폰번호 중복확인
  const checkDuplicateMutation = useMutation({
    mutationFn: async (data: { email?: string; businessNumber?: string; phoneNumber?: string }) => {
      const response = await axiosInstance.post('/login/company-check-duplicate', data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      if (variables.email) {
        setEmailValid(true);
        setEmailMessage('사용 가능한 이메일입니다.')
      }
      if (variables.businessNumber) {
        setBusinessNumberValid(true);
        setBusinessNumberMessage('사용 가능한 사업등록자입니다.')
      }
      if (variables.phoneNumber) {
        setPhoneNumberValid(true);
        setPhoneNumberMessage('사용 가능한 휴대폰번호입니다.')
      }
    },
    onError: (error, variables) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        if (variables.email) {
          setEmailValid(false);
          setEmailMessage('이미 사용 중인 이메일입니다.');
        }
        if (variables.businessNumber) {
          setBusinessNumberValid(false);
          setBusinessNumberMessage('이미 사용 중인 사업자등록자입니다.');
        }
        if (variables.phoneNumber) {
          setPhoneNumberValid(false);
          setPhoneNumberMessage('이미 사용 중인 폰번호입니다.');
        }
      } else {
        if (variables.email) {
          setEmailValid(false);
          setEmailMessage('이메일 중복 확인에 실패했습니다.');
        }
        if (variables.businessNumber) {
          setBusinessNumberValid(false);
          setBusinessNumberMessage('사업자등록 중복 확인에 실패했습니다.');
        }
        if (variables.phoneNumber) {
          setPhoneNumberValid(false);
          setPhoneNumberMessage('사업자등록 중복 확인에 실패했습니다.');
        }
      }
    }
  })
  // 이메일 형식검사
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  //휴대폰 번호 유효성 검사
  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^01[0-9]{8,9}$/; // 한국 휴대폰 번호 형식 검사
    return phoneRegex.test(phoneNumber);
  };

  // 비밀번호 조건 검사 (5~20자, 특수기호 포함)
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,20}$/;
    return passwordRegex.test(password);
  };

  // 회원가입 API 호출
  const signUpMutation = useMutation({
    mutationFn: async (companyData: { name: string; email: string; phoneNumber: string; businessNumber: string; password: string; userType: string }) => {
      const response = await axiosInstance.post('login/companysignup', companyData);
      return response.data
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      navigate('/loginPage')
    },
    onError: (error) => {
      alert('회원가입에 실패했습니다. 다시시도해주세요.')
    }
  })

  // 회원가입 버튼 활성화 조건
  const isSignUpEnabled = () =>
    name.trim() !== '' &&
    validateEmail(email) &&
    emailValid === true &&
    validatePhone(phoneNumber) &&
    phoneNumberValid === true &&
    validatePassword(password) &&
    password === confirmPassword;

  return (
    <div className={styles['signup-box']}>
      <span>기업 회원가입</span>
      <div className={styles['signup-wrap']}>
        <input placeholder='기업명' className={styles['default-input']} required onChange={(e) => setName(e.target.value)} value={name} />
        <div className={styles['signup-doublecheck']}>
          <input placeholder='이메일' required onChange={(e) => setEmail(e.target.value)} value={email} />
          <button disabled={!validateEmail(email)}
            onClick={() => checkDuplicateMutation.mutate({ email })}
          >중복확인</button>
        </div>
        {!validateEmail(email) && email.length > 0 && (<p className={styles['error-feedback']}>이메일 형식을 다시 확인해주세요.</p>)}
        {emailValid === false && <p className={styles['error-feedback']}>{emailMessage}</p>}
        {emailValid === true && <p className={styles['valid-feedback']}>{emailMessage}</p>}
        <div className={styles['signup-doublecheck']}>
          <input placeholder='사업자등록번호' className='' required onChange={(e) => setBusinessNumber(e.target.value)} />
          <button
            onClick={() => checkDuplicateMutation.mutate({ businessNumber })}>중복확인</button>
        </div>
        {businessNumberValid === false && <p className={styles['error-feedback']}>{businessNumberMessage}</p>}
        {businessNumberValid === true && <p className={styles['valid-feedback']}>{businessNumberMessage}</p>}
        <div className={styles['signup-doublecheck']}>
          <input placeholder='휴대폰번호' className='' required maxLength={11}
            onChange={(e) => setphoneNumber(e.target.value)} />
          <button disabled={!validatePhone(phoneNumber)}
            onClick={() => checkDuplicateMutation.mutate({ phoneNumber })}
          >중복확인</button>
        </div>
        {phoneNumberValid === false && <p className={styles['error-feedback']}>{phoneNumberMessage}</p>}
        {phoneNumberValid === true && <p className={styles['valid-feedback']}>{phoneNumberMessage}</p>}
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
      <button
        disabled={!isSignUpEnabled()}
        onClick={() => signUpMutation.mutate({ name, email, phoneNumber, businessNumber, password, userType: 'company' })}>회원가입</button>
    </div>
  )
}

export default CompanySignUpPage
