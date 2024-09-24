const { get } = require("http")

const getAllUsers = (req , res) =>{
    res.send("all Users fetched!")
}

const signup = (req , res) =>{
    res.send("signing up !")
}

const login = (req , res) =>{
    res.send("Loging in !")
}

const getUserProfile = (req , res) =>{
    res.send("Profile fetched !")
}

const updateUserProfile = (req , res) =>{
    res.send("Profile Updated !")
}

const deleteUserProfile = (req , res) =>{
    res.send("Profile deleted !")
}

module.exports = {
    getAllUsers ,
    signup ,
    login,
    getUserProfile ,
    updateUserProfile ,
    deleteUserProfile,
}