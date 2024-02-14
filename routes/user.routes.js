const router = require('express').Router();
const authController = require('../controllers/auth.Controller');

router.post("/register" , authController.signUp);

module.exports = router;

