const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pushrepo() {
    const repoPath = path.resolve(process.cwd(), ".NukeIt");
    const commitspath = path.join(repoPath, "commits");

    try {
        // Read all commit directories
        const commitdirs = await fs.readdir(commitspath);

        for (const commitdir of commitdirs) {
            const commitpath = path.join(commitspath, commitdir);
            
            // Read all files in the current commit directory
            const files = await fs.readdir(commitpath);

            for (const file of files) {
                const filepath = path.join(commitpath, file);
                
                // Read the file content (binary or text)
                const filecontent = await fs.readFile(filepath);

                // Prepare S3 upload parameters
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitdir}/${file}`, // Correct 'key' to 'Key'
                    Body: filecontent,
                };

                // Upload file to S3
                await s3.upload(params).promise();
            }
        }

        console.log("All commits pushed to S3");
    } catch (err) {
        console.error("Error pushing the file", err);
    }
}

module.exports = { pushrepo };
