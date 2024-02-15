const UserModel = require('../models/user.Model'); // Fix casing issue
const ObjectId = require('mongoose').Types.ObjectId; // Add missing import statement

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`ID unknown : ${req.params.id}`)

    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        res.send(user);
    } catch (err) {
        console.log('ID unknown : ' + err);
    }
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`ID unknown : ${req.params.id}`);

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id }, 
            {$set: {
                bio: req.body.bio
                }
            }, 
            {new: true, upsert: true, setDefaultsOnInsert: true},
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send(updatedUser);
    } 
    catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`ID unknown : ${req.params.id}`);

    try {
        await UserModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.follow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(400).send(`ID unknown : ${req.params.id} or ${req.body.idToFollow}`);

    try {
        // Add to the follower list
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true }
        );

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(201).json(user);

        // Add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.unfollow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
        return res.status(400).send(`ID unknown : ${req.params.id} or ${req.body.idToUnfollow}`);

    try {
        // Remove from the follower list
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true }
        );

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(201).json(user);

        // Remove from following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}