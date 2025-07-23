const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js"); 
const authRoutes = require("./routes/authRoutes.js"); 
const taskRoutes = require("./routes/taskRoutes.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const FrontendUrl = process.env.FRONTEND_URL

app.use(cors({
  origin: FrontendUrl, 
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/task', taskRoutes)

// PORT FROM ENV
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
