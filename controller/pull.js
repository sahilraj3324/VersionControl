const fs = require("fs").promises
const path = require("path")

const {s3 , S3_BUCKET} = require("../config/aws-config")

async function pullrepo() {
    const repoPath = path.resolve(process.cwd(), ".NukeIt")
    const commitspath = path.join(repoPath , "commits")

    try{
        const data = await s3.listObjectsV2({
            Bucket: S3_BUCKET,
            Prefix: "commits/"
        }).promise()

        const objects = data.Contents

        for(const object of objects){
            const key = object.Key;
            const commitdir = path.join(
                commitspath ,
                path.dirname(key).split("/").pop()
            )
            await fs.mkdir(commitdir , {recursive:true})

            const params = {
                Bucket : S3_BUCKET,
                Key : key,
            }

            const filecontent = await s3.getObject(params).promise()
            await fs.writeFile(path.join(repoPath , key) , filecontent.Body)

            console.log("all commits pulled from s3")
        }
    }
    catch(err){
        console.error("Error in pulling files" , err)
    }
}

module.exports = {pullrepo}