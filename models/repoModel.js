
const mongoos = require('mongoose')
const {Schema} = mongoos


const RepositorySchema = new Schema({
    name : {
        type : String, 
        required : true,
        unique : true 
    },
    description : {
        type : String,
    },
    content : [
        {
            type : String,
        }
    ],
    visibility : {
        type : Boolean
    },

    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true ,
    },

    issue : [
        {
            type : Schema.Types.ObjectId,
            ref : "Issue"
        }
    ]

})

const Repositories = mongoos.model("Repositories" , RepositorySchema)

export default Repositories