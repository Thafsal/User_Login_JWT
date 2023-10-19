const express = require('express')

const router = express.Router()
const {
    getUsersignup,
    getUserlogin,
    createUser,
    updateUser,
    deleteUser,
    userSignup,
    renderHome
} = require('../controller/userController')
router.route('/home').get(renderHome);
router.route('/:id').put(updateUser).delete(deleteUser)

//user login
router.route('/login').get(getUserlogin).post(createUser)

//user signup

router.route('/signup').get(getUsersignup).post(userSignup)
module.exports = router 