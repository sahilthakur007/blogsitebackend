const Blogs = require("../model/blog")
exports.storeBlog = async (req, res) => {

    const { topic, title, image, content, author } = req.body
    if (!topic || !title || !image || !content || !author) {
        return res.status(400).json({
            message: "missing some value"
        })

    }
    try {
        const blog = await Blogs.create({
            topic, title, image, content, userId: req.user._id, author
        })
        if (!blog) {
            return res.status(500).json({
                message: "some thing is wrong"
            })
        }
        return res.status(200).json({
            blog
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "some thing is wrong"
        })
    }
}
exports.sendAllBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.status(200).json({
            blogs
        })
    }
    catch (error) {
        res.status(200).json({
            message: "some thing is wrong"
        })
    }

}
exports.deleteSingleBlog = async (req, res) => {
    const _id = req.params.id
    try {
        await Blogs.deleteOne({ _id });
        res.status(200).json({
            message: "deleted sussesfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: "some thing is wrong"
        })
    }
}
exports.updateBlog = async (req, res) => {
    const { topic, title, image, content } = req.body
    const _id = req.params.id;
    try {
        const blog = await Blogs.findById({ _id });
        if (!blog) {
            return res.status(400).json({
                message: "blog not found"
            })
        }
        blog.topic = topic || blog.topic;
        blog.title = title || blog.title;
        blog.image = image || blog.image;
        blog.content = content || blog.content;
        blog.save();

        return res.status(200).json({
            blog
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "some thing is wrong"
        })
    }
}
exports.addComment = async (req, res) => {
    const { comment, commentUserName } = req.body;
    const id = req.params.id;
    if (!comment || !commentUserName || !id) {
        return res.status(400).json({
            message: "missing some value"
        })

    }

    if (!req.user) {
        return res.status(400).json({
            message: "missing some value"
        })
    }


    try {
        const blog = await Blogs.findById({ _id: id });
        if (!blog) {
            return res.status(400).json({
                message: "blog not found"
            })
        }
        const newcomment = {
            comment,
            commentUserName,
            commentUser: req.user._id
        }
        blog.comments.push(newcomment);
        blog.save();
        return res.status(200).json({
            blog
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "some thing is wrong"
        })
    }
}
exports.addLike = async (req, res) => {
    const id = req.params.id;
    if (!req.user || !id) {
        return res.status(400).json({
            message: "Please log In "
        })
    }


    try {
        const blog = await Blogs.findById({ _id: id });
        if (!blog) {
            return res.status(400).json({
                message: "blog not found"
            })
        }





        const addlikedUser = {
            likedUser: req.user._id
        }
        blog.Likes.push(addlikedUser)


        blog.save();
        return res.status(200).json({
            blog
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "some thing is wrong"
        })
    }

}
exports.removeLike = async (req, res) => {
    const id = req.params.id;
    const uid = req.params.uid;

    if (!req.user || !id) {
        return res.status(400).json({
            message: "Please log In "
        })
    }


    try {
        const blog = await Blogs.findById({ _id: id });
        if (!blog) {
            return res.status(400).json({
                message: "blog not found"
            })
        }
        const present = blog.Likes.filter((like) => like.likedUser != uid)


        blog.Likes = present;
        blog.save();
        return res.status(200).json({
            blog
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "some thing is wrong"
        })
    }
}
exports.sendSingleBlog = async (req, res) => {
    const blog_id = req.params.id;
    if (!req.user || !blog_id) {
        return res.status(400).json({
            message: "Please log In "
        })
    }
    try {
        console.log(blog_id)
        const blog = await Blogs.findById({ _id: blog_id });
        if (!blog) {
            return res.status(400).json({
                message: "Something is wrong"
            })
        }
        res.status(200).json({
            message: "Success",
            blog
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Server side error"
        })
    }
}