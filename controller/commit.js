const fs = require('fs').promises
const path = require('path')
const {v4 : uuidv4} = require("uuid")


async function commitrepo(message) {
    const repoPath = path.resolve(process.cwd() , ".NukeIT")
    const stagingarea = path.join(repoPath , "staging")
    const commitpath = path.join(repoPath , "commits")

    try{
       const commitid = uuidv4()
       const commitdir = path.join(commitpath , commitid)
       await fs.mkdir(commitdir , {recursive : true})

       const files = await fs.readdir(stagingarea)
        for(const file of files){
            await fs.copyFile(
                path.join(stagingarea , file),
                path.join(commitdir , file)
            )
        }
        await fs.writeFile(
            path.join(commitdir , "commit.json"),
            JSON.stringify({message , date : new Date().toISOString()})

            
        )

        console.log(`Commit ${commitid} created with message : ${message}`)
    }
    catch(err){
        console.error("Error in commiting file" , err)
    }
}

module.exports = {commitrepo}