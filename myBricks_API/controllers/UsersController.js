const bcrypt = require('bcrypt');

const User = require('../models/user.js');

const UsersController = {
    async postNew(req, res) {
        const { username, email, password } = req.body;

        if (!username) { return res.status(400).json({ error: 'Missing username'}); }
        if (!email) { return res.status(400).json({ error: 'Missing email' }); }
        if (!password) { return res.status(400).json({ error: 'Missing password' }); }

        try {
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                userName: username,
                email: email,
                password: hashedPassword,
            });

            return res.status(201).json({ id: newUser._id, email: newUser.email });
        } catch (err) {
            return res.status(500).json({ error: 'Could not create user' });
        }
    },

    async countUsers(req, res) {
        try {
            const count = await User.countDocuments();
            return res.json({ count });
        } catch (err) {
            return res.status(500).json({ error: 'Error counting users' });
        }
    }
};

module.exports = UsersController;