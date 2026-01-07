import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div /*className='flex flex-row gap-4'*/
    style={{alignContent:'center',margin:10,display:'flex',gap:"100px"}}>
      <NavLink to='/'>
        Home
      </NavLink>
      <NavLink to='/pastes'>
        All pastes
      </NavLink>
      {/* <NavLink to='/pastes/:id'>
        ViewPastes
      </NavLink> */}
    </div>
  )
}

export default Navbar
