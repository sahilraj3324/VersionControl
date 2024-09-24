const express = require("express")
const issueController = require("../controller/issueController")

const issueRouter = express.Router()

issueRouter.post("/issue/create" , issueController.createIssue)
issueRouter.put("/issue/update/:id" , issueController.updateIssuebyID)
issueRouter.delete("/issue/delete/:id" , issueController.deleteIssuebyID)
issueRouter.get("/issue/all" , issueController.getallIssue)
issueRouter.get("/issue/:id" , issueController.getIssuebyID)

module.exports = issueRouter