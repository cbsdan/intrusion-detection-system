const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, isAdmin} = require("../middleware/auth") 

const { 
    registerUser,
    loginUser,
    getAllUsers,
    getUserDetails,
    updateUser,
    updateUserPassword,
    countAllUsers
} = require('../controllers/auth');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/admin/all-users', isAdmin, getAllUsers);
router.get('/admin/userCounts', isAdmin, countAllUsers);
router.get('/admin/user/:id', isAdmin, getUserDetails);
router.put('/admin/update-user/:id', isAdmin, updateUser);
router.put('/admin/update-password/:id', updateUserPassword);


module.exports = router;
