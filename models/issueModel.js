
const mongoos = require('mongoose')
const { required } = require('yargs')
const { default: Repositories } = require('./repoModel')
const { default: mongoose } = require('mongoose')
const {Schema} = mongoos


const IssueSchema = new Schema({
    title : {
        type : String ,
        required : true ,
    },
    description : {
        type : String ,
        required : true,
    },
    status : {
        type : String ,
        enum : ["open" , "closed"],
        default : "open",
    },
    repositories : {
        type : Schema.Types.ObjectId,
        required: true,
        ref : "Repositories",
    }
})

const Issue = mongoose.model("Issue " , IssueSchema)

export default Issue