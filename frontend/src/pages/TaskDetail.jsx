import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${BACKEND_URL}/api/task/getSingleTask/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTask(res.data)
      } catch (err) {
        console.error('Error fetching task:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${BACKEND_URL}/api/task/getSingleTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      navigate('/')
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  if (loading) {
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />
      </Box>
    )
  }

  if (!task) {
    return (
      <Box mt={4} textAlign="center">
        <Typography>Task not found</Typography>
      </Box>
    )
  }

  return (
    <Box mt={4} px={{ xs: 1, sm: 2, md: 4 }}>
      {/* Back Button */}
      <Box mb={2}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          maxWidth: '800px',
          margin: 'auto',
          wordBreak: 'break-word',
        }}
      >
        {/* Edit Button */}
        <IconButton
          onClick={() => navigate(`/task/edit/${id}`)}
          sx={{ position: 'absolute', top: 16, right: 56 }}
        >
          <EditIcon />
        </IconButton>

        {/* Delete Button */}
        <IconButton
          onClick={() => setOpenDialog(true)}
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <DeleteIcon />
        </IconButton>

        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
        >
          {task.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            whiteSpace: 'pre-wrap',
            fontSize: { xs: '1rem', sm: '1.125rem' },
            mt: 2,
          }}
        >
          {task.description}
        </Typography>

        {/* Status */}
        <Typography
          variant="subtitle1"
          color="text.secondary"
          mt={3}
          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
        >
          Status: {task.status}
        </Typography>

        {/* Created Date */}
        <Typography
          variant="caption"
          color="gray"
          sx={{ display: 'block', mt: 1 }}
        >
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>


  )
}

export default TaskDetail
