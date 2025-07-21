import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { isTokenValid, clearToken } from '../utils/TokenValid'

import { Box, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import InputField from '../components/InputField'
import TaskList from '../components/TaskList'
import '../App.css' 
const Home = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!isTokenValid()) {
      clearToken()
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
      <Navbar />
      <Box className="home-container">
        {/* Search Bar */}
        <Box className="search-bar-container">
          <InputField
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {/* Add Task Icon */}
        <IconButton
          onClick={() => navigate('/createTask')}
           sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: '50%',
            p: 1.5,
            '&:hover': {
              backgroundColor: '#115293',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <TaskList searchTerm={searchTerm} />
    </>
  )
}

export default Home
