const fs = require("fs").promises
const path = require("path")

async function addrepo(filepath) {
    const repoPath = path.resolve(process.cwd(), ".Nukeit")
    const stagingarea = path.join(repoPath , "staging")

    try {
         await fs.mkdir(stagingarea , {recursive : true})
         const filename = path.basename(filepath)
         await fs.copyFile(filepath , path.join(stagingarea , filename))
         console.log(`file ${filename} is added to the staging area!`)
    }
    catch(err) {
        console.error("error adding file " , err)
    }
}

module.exports = {addrepo}