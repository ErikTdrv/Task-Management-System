const User = require("../models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateToken = (token) => {
    try {
        const data = jwt.verify(token, 'DASIJ319-0DSANM19M')
        return data
    } catch (error) {
        throw new Error('Invalid cookie token!')
    }
}
const createAccessToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    }
    const cookie = jwt.sign(payload, 'DASIJ319-0DSANM19M')
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        cookie
    };
}
const register = async (data) => {
    try {
        const existingEmail = await User.findOne({ email: data.email })
        const existingUsername = await User.findOne({ username: data.username })
    
        if (existingEmail) {
            throw new Error('Email already exists!')
        } else if (existingUsername) {
            throw new Error('Username already exists!')
        }
        const user = await User.create(data)
        return createAccessToken(user)
    } catch (error) {
        throw new Error(error)
    }
}
const login = async (data) => {
    try {
        const user = await User.findOne({email: data.email});
        if(!user){
            throw new Error('Invalid email or password!')
        }
        const isUser = await bcrypt.compare(data.password, user.password)
        if(isUser){
            let userToReturn = createAccessToken(user)
            userToReturn.avatarImg = user.avatarImg;
            userToReturn.imageId = user.imageId;
            return userToReturn
        }else {
            throw new Error('Invalid email or password!')
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    register,
    login, 
    validateToken
}