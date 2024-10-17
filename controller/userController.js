const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
var ObjectId = require("mongodb").ObjectId

dotenv.config();

const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
    try {
        if (!client) {
            client = new MongoClient(uri, {
                useUnifiedTopology: true,  
            });
            await client.connect();
            console.log("Connected to MongoDB");
        }
    } catch (err) {
        console.error("Failed to connect to MongoDB", err.message);
        throw err;
    }
}

// Sample route to test MongoDB connection
async function getAllUsers (req, res) {
    try{
        await connectClient();  
        const db = client.db("gitclone");
        const userCollection = db.collection("users");

        const users = await userCollection.find({}).toArray()
        res.json(users)

    }catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).send("Server error");
    }
}

async function signup(req, res) {
    const { username, password, email } = req.body;
    
    try {
        await connectClient();  
        const db = client.db("gitclone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            password: hashedPassword,
            email,
            repo: [],
            followedUsers: [],
            starRepos: []
        };

        const result = await userCollection.insertOne(newUser);

        
        const token = jwt.sign(
            { id: result.insertedId }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "1h" }
        );
        res.json({ token , userId: result.insertedId });

    } catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).send("Server error");
    }
}

async function login(req , res) {
    const {email , password } = req.body
    try {
        await connectClient();
        const db = client.db("gitclone")
        const userCollection = db.collection("users")

        const user = await userCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid creditionals" });
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if (!isMatch){
            return res.status(400).json({ message: "invalid creditionals" });
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY , {expiresIn:"1hr"})
        res.json({token , userId:user._id})
    }catch(err){
        console.error("Error durin login" , err.message)
        res.status(500).send("server error !")
    }
}

async function getUserProfile  (req , res) {
    const currentId = req.params.id
    try{
        await connectClient();
        const db = client.db("gitclone")
        const userCollection = db.collection("users")

        const user = await userCollection.findOne({
            _id: new ObjectId(currentId)
        })
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        res.send(user)

    }catch(err){
        console.error("Error durin fetching" , err.message)
        res.status(500).send("server error !")
    }
}

async function updateUserProfile  (req , res){
    const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("gitclone");
    const usersCollection = db.collection("users");

    let updateFields = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      {
        _id: new ObjectId(currentID),
      },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(result.value);
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function deleteUserProfile(req , res) {
    const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("gitclone");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentID),
    });

    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User Profile Deleted!" });
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}

module.exports = {
    getAllUsers ,
    signup ,
    login,
    getUserProfile ,
    updateUserProfile ,
    deleteUserProfile,
}