const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');


//authentification
router.post("/register" , authController.signUp);
router.post("/login" , authController.signIn);
router.get("/logout" , authController.logout);


// user display: 'block',
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// follow & unfollow
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);


module.exports = router;