const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

//@desc register user
//@route POST /api/users
//@access public
const registerUser = asyncHandler( async (req,res) => {
    const { name, email, password, identity } = req.body

    if(!name || !email || !password || !identity){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        identity
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        }) 
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate User
// Aroute POST /api/users/login
// @access Public
const loginUser = (req, res) => {
    res.json({message: "login user"})
}

// @desc get user data
// Aroute GET /api/users/me
// @access Public
const getMe = (req, res) => {
    res.json({message: "user match data"})
}



module.exports = {
    registerUser,
    loginUser,
    getMe
}