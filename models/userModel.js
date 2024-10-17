const mongoos = require('mongoose')
const {Schema} = mongoos

const UserSchema = new Schema({
    username : {
        type : String, 
        required : true,
        unique : true 
        
    },
    email : {
        type : String, 
        required : true,
        unique : true 
    },
    password : {
        type : String,
    },
    repositories : [
        {
            default : [],
            type : Schema.Types.ObjectId,
            ref : "Repositories"
        }
    ],
    followedUser : [
        {
            default : [],
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    starRepo : [
        {
            default : [],
            type : Schema.Types.ObjectId,
            ref : "Repositories"
        }
    ]
})

const User = mongoos.model("User" , UserSchema)

module.exports =  User