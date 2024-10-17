const mongoose = require("mongoose");
const Repositories = require('../models/repoModel');
const User = require("../models/userModel");
const Issue = require("../models/issueModel");


async function createIssue  (req , res ){
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const issue = new Issue({
      title,
      description,
      repository: id,
    });

    await issue.save();
    res.status(201).json(issue);
  }catch (err) {
    console.error("Error during issue creation : ", err.message);
    res.status(500).send("Server error");
  }
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