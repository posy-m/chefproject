import Input from '../components/Input'
import styles from '../styles/UserSignupPage.module.css'
import React from 'react'

const CompanySignUpPage = () => {
  return (
    <div className={styles['signup-box']}>
      <span>기업 회원가입</span>
      <div className={styles['signup-wrap']}>
        <Input placeholder='기업명' className={styles['default-input']} />
        <div className={styles['signup-doublecheck']}>
          <Input placeholder='이메일' className='' />
          <button>중복확인</button>
        </div>
        <div className={styles['signup-doublecheck']}>
          <Input placeholder='사업자등록번호' className='' />
          <button>중복확인</button>
        </div>
        <div className={styles['signup-doublecheck']}>
          <Input placeholder='휴대폰번호' className='' />
          <button>중복확인</button>
        </div>
        <Input placeholder='비밀번호(특수기호 포함 5글자~20글자)' className={styles['default-input']} />
        <Input placeholder='비밀번호 확인' className={styles['default-input']} />
      </div>
      <button>회원가입</button>
    </div>
  )
}

export default CompanySignUpPage
