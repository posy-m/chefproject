import useAuthStore from '../zustand/authStore';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <div>
      관리자 페이지
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default AdminPage
