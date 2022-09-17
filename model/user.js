const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        
    },
    savedBlog: [
        {
            blog: {
                type: mongoose.Schema.ObjectId,
                ref: "Blogs",
                required: true
            }
       }
    ]

})
module.exports = mongoose.model("blogUser", userSchema);