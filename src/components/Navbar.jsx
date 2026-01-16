import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon, FileText, PlusCircle } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.navbar}
    >
      <div className={styles.logo}>
        <FileText size={24} className={styles.logoIcon} />
        <span>NotesApp</span>
      </div>

      <div className={styles.navLinks}>
        <NavLink
          to='/'
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          <HomeIcon size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to='/pastes'
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          <PlusCircle size={18} />
          <span>All Notes</span>
        </NavLink>
      </div>
    </motion.nav>
  )
}

export default Navbar;
