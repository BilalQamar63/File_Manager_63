import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const TaskList = ({ searchTerm = '' }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${BACKEND_URL}/api/task/getAllTasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTasks(res.data)
      } catch (err) {
        console.error('Failed to fetch tasks:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'in progress' : 'completed'
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `${BACKEND_URL}/api/task/updateStatus/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, status: newStatus } : task
        )
      )
    } catch (err) {
      console.error(`Failed to update status:`, err)
    }
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <Box className="task-loader">
        <CircularProgress />
      </Box>
    )
  }

  if (filteredTasks.length === 0) {
    return (
      <Box className="task-empty">
        <Typography>No matching tasks found</Typography>
      </Box>
    )
  }

  return (
    <Box className="task-list-container">
      {filteredTasks.map((task) => (
        <Box
          key={task._id}
          onClick={() => navigate(`/task/${task._id}`)}
          className="task-wrapper"
        >
          <Paper
            className={`task-card ${task.status === 'completed' ? 'task-completed' : 'task-inprogress'}`}
            elevation={3}
          >
            <Box className="task-header">
              <Typography variant="h6">{task.title}</Typography>
              <Box className="task-actions">
                <Chip
                  label={task.status === 'completed' ? 'Completed' : 'In Progress'}
                  color={task.status === 'completed' ? 'success' : 'warning'}
                  variant="outlined"
                />
                <Tooltip
                  title={
                    task.status === 'completed'
                      ? 'Mark as In Progress'
                      : 'Mark as Completed'
                  }
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStatus(task._id, task.status)
                    }}
                  >
                    {task.status === 'completed' ? (
                      <CloseIcon sx={{ color: 'red' }} />
                    ) : (
                      <DoneIcon color="success" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Typography
              variant="body2"
              className="task-description"
              noWrap
            >
              {task.description}
            </Typography>

            <Typography variant="caption" className="task-date">
              Created on: {new Date(task.createdAt).toLocaleDateString()}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  )
}

export default TaskList
