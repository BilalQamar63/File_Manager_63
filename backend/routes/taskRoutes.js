const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  updateTaskStatus
} = require('../controllers/taskController');

router.use(authMiddleware); 

router.post('/createTask', createTask);
router.get('/getAllTasks', getAllTasks);
router.get('/getSingleTask/:id', getSingleTask);
router.put('/getSingleTask/:id', updateTask);
router.delete('/getSingleTask/:id', deleteTask);
router.put('/updateStatus/:id',  updateTaskStatus);

module.exports = router;
