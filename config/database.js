const mongoose = require("mongoose")

const  connectDatabase = ()=> {
    const url = `mongodb+srv://${process.env.CLIENT_ID}:${process.env.CLIENT_PASSWORD}@cluster0.0lm2s.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(url).then(console.log("Database is conected sussesfully")).catch((error) => {
        console.log(error);
    })
}
module.exports = connectDatabase; 