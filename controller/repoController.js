const mongoose = require("mongoose");
const Repositories = require('../models/repoModel');
const User = require("../models/userModel");
const Issue = require("../models/issueModel");


async function createRepo(req, res) {
    const { owner, name, issues, content, description, visibility } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ error: "Repo name is required!" });
        }
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Owner ID is invalid!" });
        }
        const newRepo = new Repositories({
            name,
            description,
            visibility,
            owner,
            content,
            issues,
        });
        const result = await newRepo.save();
        res.status(201).json({
            message: "Repo created",
            repoID: result._id,
        });
    } catch (err) {
        console.error("Error during repo creation", err.message);
        res.status(500).send("Server error!");
    }
}


const getallRepo = async (req, res) => {
    try {
        const repos = await Repositories.find({})
            .populate('owner') 
            .populate('issues'); 

        res.status(200).json(repos);
    } catch (err) {
        console.error('Error finding repositories:', err.message);
        res.status(500).send('Server error!');
    }
};


async function fetchedRepobyId(req, res) {
    const { id } = req.params; 
    try {
        const repo = await Repositories.findById(id)
            .populate("owner")
            .populate("issues");
        
        if (!repo) {
            return res.status(404).json({ error: "Repository not found" });
        }

        res.json(repo);
    } catch (err) {
        console.error("Error finding repo by ID", err.message);
        res.status(500).send("Server error!");
    }
}


async function fetchedRepobyName(req, res) {
    const { name } = req.params; 
    try {
        const repo = await Repositories.findOne({ name }) 
            .populate("owner")
            .populate("issues");

        if (!repo) {
            return res.status(404).json({ error: "Repository not found" });
        }

        res.json(repo);
    } catch (err) {
        console.error("Error finding repo by name", err.message);
        res.status(500).send("Server error!");
    }
}


async function fetchRepoforcurrentuser(req, res) {
    const {userId} = req.params;
    try{
        const repo = await Repositories.find({ userId})
        if (!repo || repo.length==0){
            return res.status(404).json({error : "user repo not found!"})
        }
        res.json({message : "Repo found " ,  repo })
    }catch (err) {
        console.error("Error getting user", err.message);
        res.status(500).send("Server error!");
    }
}


async function updateRepobyID(req, res) {
    const {id} = req.params
    const {content  , description } = req.body 
    try{
        const repo = await Repositories.findById(id)
        if (!repo ){
            return res.status(404).json({error : "repo not found!"})
        }
        repo.content.push(content)
        repo.description = description

        const updatedRepo = await repo.save()

        res.json({
            message: "Repo updated successfully",
            repo : updatedRepo,
        })

    }catch (err) {
        console.error("Error updating repo", err.message);
        res.status(500).send("Server error!");
    }
}


async function toggleVisibiltybyID(req, res) {
    const {id} = req.params
    try{
        const repo = await Repositories.findById(id)
        if (!repo ){
            return res.status(404).json({error : "repo not found!"})
        }
        repo.visibility = !repo.visibility

        const updatedRepo = await repo.save()

        res.json({
            message: "Repo visibility toggled successfully",
            repo : updatedRepo,
        })

    }catch (err) {
        console.error("Error toglling repo", err.message);
        res.status(500).send("Server error!");
    }
}

async function deleteRepobyID(req, res) {
    const { id } = req.params
    try{
        const repo = await Repositories.findByIdAndDelete(id)
        if (!repo ){
            return res.status(404).json({error : "repo not found!"})
        }
        res.json({
            message : "Repo deleted successfully"

        })
    }catch (err) {
        console.error("Error toglling repo", err.message);
        res.status(500).send("Server error!");
    }
}

module.exports = {
    createRepo,
    getallRepo,
    fetchedRepobyId,
    fetchedRepobyName,
    fetchRepoforcurrentuser,
    updateRepobyID,
    toggleVisibiltybyID,
    deleteRepobyID,
};
