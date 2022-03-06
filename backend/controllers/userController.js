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
            identity: user.identity,
            token: generateToken(user._id)
        }) 
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// @desc Authenticate User
// Aroute POST /api/users/login
// @access Public
const loginUser = asyncHandler ( async (req, res) => {
    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid login')
    }

})

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