const createIssue = (req , res ) =>{
    res.send("issue Created")
}
const updateIssuebyID = (req , res ) =>{
    res.send("issue updated")
}
const deleteIssuebyID = (req , res ) =>{
    res.send("issue deleted")
}
const getallIssue = (req , res ) =>{
    res.send("all issue ")
}
const getIssuebyID = (req , res ) =>{
    res.send("current issue")
}

module.exports = {
    createIssue,
    updateIssuebyID,
    deleteIssuebyID,
    getIssuebyID,
    getallIssue,
}