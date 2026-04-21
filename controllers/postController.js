const Post = require("../models/Post");

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(401).json({
                success: false,
                message: "Title & Content Required"
            });
        }

        const post = await Post.create({
            title, content, user: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            post
        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Unable to POST",
            error: e.message
        });
    }
};

const getAllPost = async(req,res) => { 
    try{
        const posts = await Post.find().populate("user","name email");
        res.status(200).json({
            success:true,
            message: "All Posts",
            count: posts.length,
            posts
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message: "Unable to get Posts",
            error:e.message
        });
    }
};

const getSinglePost = async(req,res) => { 
    try{
        const {id} = req.params;
        const post = await Post.findById(id).populate("user","name email");
        if(!post){
            return res.status(404).json({
                success:false,
                message: "Post Not Found"
            });
        }
        res.status(200).json({
            success:false,
            message: "Post Found",
            post
        })
    }
    catch(e){
        res.status(500).json({
            success:false,
            message: " Unable to find post",
            error:e.message
        });
    }
};

const updatePost = async(req,res) => { };

const deletePost = async(req,res) => { };

module.exports = { createPost };