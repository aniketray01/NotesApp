import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>📝 NotesApp</div>
      <NavLink
        to='/'
        className={({ isActive }) => isActive ? styles.active : ''}
      >
        Home
      </NavLink>
      <NavLink
        to='/pastes'
        className={({ isActive }) => isActive ? styles.active : ''}
      >
        All Notes
      </NavLink>
    </nav>
  )
}

export default Navbar
