const createRepo = (req , res ) =>{
    res.send("Repo Created")
}
const getallRepo = (req , res ) =>{
    res.send("All repo")
}
const fetchedRepobyId = (req , res ) =>{
    res.send("Repo fetched by id")
}
const fetchedRepobyName = (req , res ) =>{
    res.send("repo fetched by name")
}
const fetchRepoforcurrentuser = (req , res ) =>{
    res.send("current user repo")
}
const updateRepobyID = (req , res ) =>{
    res.send("updated repo for curr user")
}
const toggleVisibiltybyID = (req , res ) =>{
    res.send("toggling repo")
}
const deleteRepobyID = (req , res ) =>{
    res.send("Repo deleted")
}

module.exports = {
    createRepo,
    getallRepo,
    fetchedRepobyId,
    fetchedRepobyName,
    fetchRepoforcurrentuser,
    updateRepobyID,
    toggleVisibiltybyID,
    deleteRepobyID
}