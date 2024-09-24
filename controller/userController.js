const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")

dotenv.config();
const uri = process.env.MONGODB_URI

let client

async function connectClient() {
    
    
    try {
        if (!client || !client.isConnected()) {
            client = new MongoClient(uri, {
                useUnifiedTopology: true,  // Only this option is needed for the latest MongoDB versions
            });
            await client.connect();
            console.log("Connected to MongoDB");
        }
    } catch (err) {
        console.error("Failed to connect to MongoDB", err.message);
        throw err;
    }
}


const getAllUsers = (req , res) =>{
    res.send("all Users fetched!")
}

async function signup  (req , res) {
    const { username , password , email} = req.body
    try{
        await connectClient()
        const db = client.db("gitclone")
        const userClollection = db.collection("users")

        const user = await userClollection.findOne({username})
        if (user){
            return res.status(400).json({message:"user already exist"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)
        
        const newUser = {
            username,
            password:hashedPassword,
            email,
            repo : [],
            followedUsers :[],
            starRepos :[]
        }

        const result = await userClollection.insertOne(newUser)

        const token = jwt.sign({id:result.insertId}, process.env.JWT_SECRET_KEY , {expiresIn:"1h"})
        res.json({token})
    }catch(err){
        console.error("Error during signup : " , err.message)
        res.status(500).send("server error")
    }

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