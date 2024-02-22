const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = async (req, res) => {
    try {
        const docs = await PostModel.find().sort({ createdAt: -1 });
        res.send(docs);
    } catch (err) {
        console.log('Error to get data : ' + err);
    }
}

module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        // picture: req.body.picture,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(newPost);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        if (!ObjectID.isValid(postId)) {
            return res.status(400).send('ID unknown : ' + postId);
        }

        const updateRecord = {
            message: req.body.message
        };

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $set: updateRecord },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).send('Post not found');
        }

        return res.send(updatedPost);
    } catch (err) {
        console.log('Update error : ' + err);
        return res.status(500).send('Internal server error');
    }
}

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            throw new Error('Delete error');
        }
        res.send('Post deleted successfully');
    } catch (err) {
        console.log('Delete error : ' + err);
    }
}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.like } // changed from req.body.id to req.body.like
            },
            { new: true }
        );

        if (!updatedPost) {
            throw new Error('Update error');
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.like, // changed from req.body.id to req.body.like
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('Update error');
        }

        res.send({ updatedPost, updatedUser });
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.unLikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.like } // changed from req.body.id to req.body.like
            },
            { new: true }
        );

        if (!updatedPost) {
            throw new Error('Update error');
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.like, // changed from req.body.id to req.body.like
            {
                $pull: { likes: req.params.id }
            },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('Update error');
        }

        res.send({ updatedPost, updatedUser });
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.commentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true }
        );

        if (!updatedPost) {
            throw new Error('Update error');
        }

        res.send(updatedPost);
    } catch (err) {
        return res.status(400).send(err);
    }
}


module.exports.editCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const commentIndex = post.comments.findIndex((comment) =>
            comment._id.equals(ObjectID(req.body.commentId))
        );
        if (commentIndex === -1) {
            return res.status(404).send('Comment not found');
        }

        // Update the comment
        post.comments[commentIndex].commenterId = req.body.commenterId;
        post.comments[commentIndex].commenterPseudo = req.body.commenterPseudo;
        post.comments[commentIndex].text = req.body.text;
        post.comments[commentIndex].timestamp = new Date().getTime();

        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: { comments: post.comments } },
            { new: true }
        );

        if (!updatedPost) {
            throw new Error('Update error');
        }

        res.send(updatedPost);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
}

