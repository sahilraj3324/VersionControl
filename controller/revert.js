const fs = require("fs")
const path = require("path")

const { promisify } = require("util")

const readdir = promisify(fs.readdir)
const copyFile = promisify(fs.copyFile)


async function revertrepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".NukeIt")
    const commitspath = path.join(repoPath , "commits")

    try{
        const commitdir = path.join(commitspath , commitID)
        const files = await readdir(commitdir)
        const parentdir = path.resolve(repoPath , "..")

        for( const file of files){
            await copyFile(path.join(commitdir , file) , path.join(parentdir , file) )
        }
        console.log(`commit ${commitID} revwrted successfully`)
    }
    catch(err){
        console.error("unable to revert" , err)

    }
}

module.exports = {revertrepo}