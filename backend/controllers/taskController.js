const Task = require('../models/taskModel');

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newTask = new Task({
            title,
            description,
            dueDate,
            status,
            user: req.user._id
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
        
    } catch (err) {
        console.error("Error creating task:", err.message);
        res.status(500).json({ message: "Error creating Task", error: err.message });
    }
};

// Get All Tasks
exports.getAllTasks = async (req , res)=>{
    try{
        const tasks = await Task.find({user: req.user._id});
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message: 'Error fetching tasks', err});
    }
};

// Get Single Task
exports.getSingleTask = async (req , res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id, user: req.user._id});
        if(!task){
            return res.status(404).json({message: "Task not Found"});
        }
        res.status(200).json(task)
    }catch(err){
        res.status(500).json({message:"Error fetching task", error: err.message});
    }
};

// Update Task
exports.updateTask = async (req , res)=>{
    try{
        const updateTask = await Task.findOneAndUpdate({_id:req.params.id, user:req.user._id},
            req.body,{new:true}
        );
        if(!updateTask){
            return res.status(404).json({message:"Take not found or unauthorized"});
        }

        res.status(200).json(updateTask);
    }catch(err){
        res.status(500).json({message:"Error Updating Task", error: err.message});
    }
};

// Delete Task

exports.deleteTask = async(req , res)=>{
    try {
        const deleted = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id});

        if(!deleted){
            return res.status(404).json({message: "Task not found or unauthorized"});
        }

        res.status(200).json({message:'Task deleted successfully'});
    } catch (err) {
        res.status(500).json({message: 'Error deleting task', error: err.message});
    }
};


// Update Task Status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status
        if (!['pending', 'in progress', 'completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task status', error: err.message });
    }
};
