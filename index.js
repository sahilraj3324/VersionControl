const yargs = require("yargs");

const {hideBin} = require("yargs/helpers")

const {initrepo} = require("./controller/init")
const {addrepo} = require("./controller/add")
const {commitrepo} = require("./controller/commit")
const {pushrepo } = require("./controller/push");
const { pullrepo } = require("./controller/pull");
const { revertrepo } = require("./controller/revert");

yargs(hideBin(process.argv))
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
            revertrepo    

        )
    
    .demandCommand(1, "you need atleast one command").help().argv;