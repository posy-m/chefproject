import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import styles from '../styles/Layout.module.css'

const LayOut = () => {
  return (
    <div >
      <Header />
      <main className={styles['layout-main']}>
        <Outlet />
      </main>
    </div>

  )
}

export default LayOut
