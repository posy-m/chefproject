import React from 'react'
import useAuthStore from '../zustand/authStore'
import { useNavigate } from 'react-router-dom'

const UserPage = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div>
      유저 마에피에지
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default UserPage
