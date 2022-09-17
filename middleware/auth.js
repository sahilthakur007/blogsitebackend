const jwt = require("jsonwebtoken");
const User = require("../model/user");
exports.isauthenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];


        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, "user");

            const id = decodedData?.id;
            req.user = await User.findById({ _id:id })
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

