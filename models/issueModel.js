const mongoose = require('mongoose');
const { Schema } = mongoose;

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    repository: { // Singular field since one issue belongs to one repository
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Repository', // Ensure it references the correct model
    }
});

const Issue = mongoose.model('Issue', IssueSchema); // No extra space in the model name

module.exports = Issue;
