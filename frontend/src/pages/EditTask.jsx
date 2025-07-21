import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Box,
  Typography,
  MenuItem,
  Paper,
  CircularProgress,
} from '@mui/material'
import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'
import '../App.css'

const EditTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'in-progress',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${BACKEND_URL}/api/task/getSingleTask/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTaskData(res.data)
      } catch (err) {
        console.error('Error fetching task:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put(`${BACKEND_URL}/api/task/getSingleTask/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/')
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box className="edit-task-container">
      <Paper className="edit-task-paper">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Edit Task
        </Typography>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />

          <InputField
            label="Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />

          <CustomButton label="Update Task" type="submit" />
        </form>
      </Paper>
    </Box>
  )
}

export default EditTask
