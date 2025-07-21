import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { clearToken } from '../utils/TokenValid'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import GetProfile from './GetProfile'
import Logo from '/assets/Logo.png'
import '../App.css'
const Navbar = () => {
  const navigate = useNavigate()

  const [openProfile, setOpenProfile] = useState(false)

  const handleAvatarClick = () => {
    setOpenProfile(true)
  }

  const handleCloseProfile = () => {
    setOpenProfile(false)
  }

  const handleLogout = () => {
    clearToken()
    navigate('/login')
  }

  return (
    <Box position="fixed" className="navbar-container">
      <AppBar color="primary">
        <Toolbar className="navbar-toolbar">
          {/* Logo */}
          <Box className="navbar-logo-box">
            <img
              src={Logo}
              alt="My Logo"
              className="navbar-logo"
            />
          </Box>

          {/* Avatar and Logout */}
          <Box className="navbar-actions">
            <IconButton onClick={handleAvatarClick} className="avatar-button">
              <Avatar alt="Profile" src="" />
            </IconButton>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Dialog */}
      <Dialog open={openProfile} onClose={handleCloseProfile} maxWidth="sm" fullWidth>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          <GetProfile />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Navbar
