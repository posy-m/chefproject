import React, { useState } from 'react'
import styles from '../../styles/UserSignupPage.module.css'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../zustand/axiosInstance'
import { useNavigate } from 'react-router-dom'

const FindID = () => {
  const navigate = useNavigate()

  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [emailMessage, setEmailMessage] = useState<null | boolean>(null)
  const [email, setEmail] = useState<string>('')

  const findId = useMutation({
    mutationFn: async (findIdData: { name: string, phoneNumber: string }) => {
      const response = await axiosInstance.post('/login/findemail', findIdData);
      return response.data
    },
    onSuccess: (data) => {
      if (data.email) {
        setEmail(data.email);
        setEmailMessage(true)
      }
      else {
        setEmailMessage(false)
      }
    },
    onError: (error: any) => {
      if (error.response) {
        setEmailMessage(false);
        setEmail(error.response.data.messgae)
      } else {
        setEmail('알 수 없는 오류 생김 ')
      }
    }
  })

  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^01[0-9]{8,9}$/; // 한국 휴대폰 번호 형식 검사
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div className={styles['signup-box']}>
      <span>아이디 찾기</span>
      <div className={styles['signup-wrap']}>
        <input type="text" placeholder='이름을 입력해주세요' className={styles['default-input']} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder='휴대폰번호를 입력해주세요' className={styles['default-input']} required maxLength={11} pattern="[0-9]*" onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button onClick={() => findId.mutate({ name, phoneNumber })}>아이디 찾기</button>

      <div>
        {emailMessage !== null && (
          <div className={styles['find-email-box']}>
            <span>
              {emailMessage ? email : "존재하지 않는 정보입니다."}
            </span>
            <button onClick={() => navigate('/loginPage')}>확인</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FindID
