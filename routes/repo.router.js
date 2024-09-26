const express = require("express")
const repoController = require("../controller/repoController")

const repoRouter = express.Router()

repoRouter.post("/repo/create" , repoController.createRepo)
repoRouter.get("/repo/all" , repoController.getallRepo)
repoRouter.get("/repo/:id" , repoController.fetchedRepobyId)
repoRouter.get("/repo/name/:name" , repoController.fetchedRepobyName)
repoRouter.get("/repo/user/:userID" , repoController.fetchRepoforcurrentuser)
repoRouter.put("/repo/update/:id" , repoController.updateRepobyID)
repoRouter.delete("/repo/delete/:id" , repoController.deleteRepobyID)
repoRouter.patch("/repo/toggle/:id" , repoController.toggleVisibiltybyID)

module.exports = repoRouter