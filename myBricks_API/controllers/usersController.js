const bcrypt = require('bcrypt');

const User = require('../models/user.js');

const usersController = {
    async postNew(req, res, next) {
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

            console.log(`User ${username} successfully created`);
            return res.status(201).json({ message: `User ${username} successfully created`, id: newUser._id, email: newUser.email });
        } catch (err) {
            next(err);
        }
    },

};

module.exports = usersController;