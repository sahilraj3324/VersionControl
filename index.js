const express = require('express')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const bodyParser = require("body-parser")
const {Server} = require("socket.io")
const mainRouter = require("./routes/main.router")


const yargs = require("yargs");
const {hideBin} = require("yargs/helpers")
const {initrepo} = require("./controller/init")
const {addrepo} = require("./controller/add")
const {commitrepo} = require("./controller/commit")
const {pushrepo } = require("./controller/push");
const { pullrepo } = require("./controller/pull");
const { revertrepo } = require("./controller/revert");
const exp = require('constants')
const { Socket } = require('dgram')

dotenv.config()

yargs(hideBin(process.argv))
.command(
    "start" , 
    "start a new server" ,
     {} ,
    startserver
    )
.command(
    "init" , 
    "Initializing a new reposetory" ,
     {} ,
    initrepo
    )
    .command(
        "add <file>" , 
        "Adding the file to the reposetory" ,
         (yargs)=>{
            yargs.positional("file" , {
                description : "file add to the staging area" ,
                type : "string"
            })
         } ,
        (argv) => {
            addrepo(argv.file)
        }
        )
        .command(
            "commit <message>" , 
            "Commeting the file to the reposetory" ,
             (yargs)=>{
                yargs.positional("message" , {
                    description : "file commited to the staging area" ,
                    type : "string"
                })
             } ,
             (argv) => {
                commitrepo(argv.message)
            }
            )
            .command("push" , 
                "Pushing file to staging area" ,
            {},
            pushrepo
        )
        .command(
            "pull" ,
            "pulling your reposotory " ,
            {},
            pullrepo
        )
        .command(
            "revert <commitID>",
            "Reverting your reposetory",
            (yargs) => {
                yargs.positional("commitID" , {
                    description : "file reverted from the staging area",
                    type : "string"
                })
            },
            (argv) => {
                revertrepo(argv.commitID)
            }
                

        )
    
    .demandCommand(1, "you need atleast one command").help().argv;

    function startserver(){
        const app = express()
        const port = process.env.PORT || 3000

        app.use(bodyParser.json())
        app.use(express.json())
        const mongoURI = process.env.MONGODB_URI

        mongoose
        .connect(mongoURI)
        .then(()=> console.log("DataBase is connected"))
        .catch((err)=>console.error("error connection to db" , err))

        app.use(cors({origin:"*"}))

        app.use("/" , mainRouter)
        

        const httpServer = http.createServer(app)
        const io = new Server(httpServer , {
            cors: {
                origin :"*",
                methods: ["GET" , "POST"],
            }
        } )
         let user = "test"
        io.on("connection" , (socket) => {
            socket.on("join room" , (userID) =>{
                user = userID 
                console.log("=======")
                console.log(user)
                console.log("=======")
                socket.join(userID)
            })
        })

        const db = mongoose.connection

        db.once("open" , async () => {
            console.log("CRUD operations are being called")

            //CRUD Operation
        })

        httpServer.listen(port , () =>{
            console.log(`Server running on Port ${port}`)
        })
    }