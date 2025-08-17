const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    async login(req, res, next) {
        const { email, password } = req.body;

        if (!email) { return res.status(401).json({ error: 'Missing email' }); }
        if (!password) { return res.status(401).json({ error: 'Missing password' }); }

        try {
            const user = await User.findOne({ email });
            if (!user) { return res.status(401).json({ error: 'Invalid credentials' }); }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) { return res.status(401).json({ error: 'Invalid credentials' }); }

            const token = jwt.sign(
                { id: user._id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );

            res.json({ token });
        } catch (err) {
            next(err);
        }
    },

};

module.exports = authController;