const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    const { name, email, password, photo } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Some Field is missing please include that"
        })

    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password: hashedPassword, photo
        })
        const token = jwt.sign({ email: user.email, id: user.id }, "user", { expiresIn: "60m" });
        res.status(200).json({
            user, token
        })
    }
    catch (error) {
        res.status(500).json({
            message: error
        })
    }

}
exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(400).json({
            message: "Some Field is missing please include that"
        })

    }
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Unable to found user "
            })
        }
        const ismatched = await bcrypt.compare(password, user.password);
        if (ismatched) {
            const token = jwt.sign({ email: user.email, id: user.id }, "user", { expiresIn: "60m" });
            res.status(200).json({
                user, token
            })
        }
        else {
            return res.status(404).json({
                message: "Unable to found user "
            })
        }

    }
    catch (error) {

        res.status(500).json({
            message: error
        })

    }

}

exports.bookmarkBlog = async (req, res) => {
    const id = req.params.id;
    console.log(req.user)
    if (!id || !req.user) {
        return res.status(400).json({
            message: "something is wrong"
        })
    }

    try {
        const user = await User.findById({ _id: req.user._id });
        // console.log(user)
        if (!user) {

            return res.status(400).json({
                message: "something is wrong"
            })
        }
        // console.log(req.params.id)
        const newSavedBlog = {
            blog: id
        }
        user.savedBlog.push(newSavedBlog); 
         user.save(); 
        res.status(200).json({
            message: "Sussesfull",
            user
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "something is wrong"
        })
    }
}