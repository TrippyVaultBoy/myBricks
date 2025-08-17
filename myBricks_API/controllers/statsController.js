const User = require('../models/user');

const statsController = {
    async getPartCount(req, res) {
        try {
            if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            let partCount = 0;

            for (let i = 0; i < user.setCollection.length; i++) {
                partCount += user.setCollection[i].numParts;
            }

            return res.status(200).json({ partCount });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = statsController;