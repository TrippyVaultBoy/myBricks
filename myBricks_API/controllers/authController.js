const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    async login(req, res) {
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

    async checkToken(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) { return res.status(401).json({ valid: false }) };

            const token = authHeader.split(' ')[1];
            if (!token) { return res.status(401).json({ valid: false }) };

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) { return res.status(401).json({ valid: false }) };
                res.json({ valid: true, user: decoded });
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = authController;