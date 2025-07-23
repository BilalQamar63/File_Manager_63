const express= require("express");
const authController = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();


// User Routes
router.get('/', (req, res) => {
  res.send('Hello World');
});
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);
router.get("/profile", authMiddleware, authController.getProfile); 
router.put("/profile", authMiddleware, authController.updateProfile);




module.exports = router;