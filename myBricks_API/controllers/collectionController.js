const { response } = require('express');
const User = require('../models/user.js');

const collectionController = {
    async addSet(req, res) {
        try {
            const apiKey = process.env.REBRICKABLE_KEY;

            const { setNum, quantity = 1 } = req.body;
            if (!setNum) return res.status(400).json({ error: 'Missing set number' });

            if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            const existingSet = user.setCollection.find(s => s.setNum === setNum);
            if (existingSet) {
                existingSet.quantity += quantity;
            } else {
                const response = await fetch(`https://rebrickable.com/api/v3/lego/sets/${setNum}/?key=${apiKey}`);
                if (!response.ok) return res.status(400).json({ error: 'Could not retrieve set info' });

                const setData = await response.json();
                
                user.setCollection.push({
                    setNum,
                    quantity,
                    addedAt: new Date(),
                    name: setData.name,
                    themeId: setData.theme_id,
                    year: setData.year,
                    numParts: setData.num_parts,
                    setImgUrl: setData.set_img_url,
                })

                await user.save();
                return res.status(201).json({ message: `Set ${setNum} added`, set: setData });
            }
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async removeSet(req, res) {
        const { setNum, quantity = 1 } = req.body;

        if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const existingSetIndex = user.setCollection.findIndex(s => s.setNum === setNum);
        if (existingSetIndex === -1) return res.status(400).json({ error: 'Set not in collection' });

        const existingSet = user.setCollection[existingSetIndex];
        if (quantity >= existingSet.quantity) {
            user.setCollection.splice(existingSetIndex, 1);
        } else {
            existingSet.quantity -= quantity;
        }

        await user.save();
        return res.status(200).json({ message: 'Set updated', setCollection: user.setCollection });
    }
}

module.exports = collectionController;