const mongoose = require('mongoose'); 
const { Schema } = mongoose;

// Define the Repository Schema
const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue', // Referencing the Issue model
    },
  ],
  content: [
    {
      type: String,
    }
  ],
  visibility: {
    type: Boolean
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true,
  },
  
});

// Register the Repository model
const Repository = mongoose.model('Repository', RepositorySchema); // Singular model name

module.exports = Repository;
