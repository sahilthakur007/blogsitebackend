const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "blogUser",
        // required: true
    },
    title: {
        type:String,
        required:true
    },
    topic: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    Likes: [
        {
            likedUser: {
                type: mongoose.Schema.ObjectId,
                ref: "blogUser",
                // required: true
            }
        }
    ],
    comments: [
        {
            commentUser: {
                type: mongoose.Schema.ObjectId,
                ref: "blogUser",
                // required: true
            },
            comment: {
                type: String,
                required: true
            },
            commentUserName: {
                type: String,
                // required: true
            },
            commentOn: {
                type: Date,
                default: Date.now()
            }

        }
      
    ],
    author: {
        type:String
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }
})
module.exports = mongoose.model("Blogs", blogSchema);