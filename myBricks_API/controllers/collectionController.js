const { response } = require('express');
const User = require('../models/user.js');
const LegoSet = require('../models/legoSet.js');

const collectionController = {
    async addSet(req, res, next) {
        try {
            const apiKey = process.env.REBRICKABLE_KEY;

            const { setNum, quantity = 1 } = req.body;
            if (!setNum) return res.status(400).json({ error: 'Missing set number' });

            if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            if (!Number.isInteger(quantity) || quantity < 1) {
                return res.status(400).json({ error: 'Quantity must be a positive integer' })
            }

            // If set already in collection, update quantity
            const existingSet = user.setCollection.find(s => s.setNum === setNum);
            if (existingSet) {
                return res.status(400).json({ message: `Set ${setNum} already in collection`, set: existingSet});
            }
            
            // Check if set is cached
            let cachedSet = await LegoSet.findOne({ setNum });

            // If set is not cached, fetch from api and store
            if (!cachedSet) {
                const response = await fetch(`https://rebrickable.com/api/v3/lego/sets/${setNum}/?key=${apiKey}`);
                if (!response.ok) return res.status(500).json({ error: 'Could not retrieve set info' });

                const setData = await response.json();

                cachedSet = await LegoSet.create({
                    setNum,
                    name: setData.name,
                    themeId: setData.theme_id,
                    year: setData.year,
                    numParts: setData.num_parts,
                    setImgUrl: setData.set_img_url,
                    lastFetched: new Date(),
                });
                console.log(`Cached set ${setNum}`)
            }
            
            // Add set to user's collection
            user.setCollection.push({
                setNum,
                quantity,
                addedAt: new Date(),
                name: cachedSet.name,
                themeId: cachedSet.themeId,
                year: cachedSet.year,
                numParts: cachedSet.numParts,
                setImgUrl: cachedSet.setImgUrl,
            });

            await user.save();
            console.log(`Set ${setNum} added to ${user.userName}'s collection`);
            return res.status(201).json({ message: `Set ${setNum} added`, set: cachedSet });
        } catch (err) {
            next(err);
        }
    },

    async removeSet(req, res, next) {
        try {
            const { setNum } = req.params;

            if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            const setIndex = user.setCollection.findIndex(s => s.setNum === setNum);
            if (setIndex === -1) return res.status(404).json({ error: 'Set not found in collection' });

            user.setCollection.splice(setIndex, 1);

            await user.save();
            console.log(`Set ${setNum} removed from ${user.userName}'s collection`);
            return res.status(200).json({ message: 'Set removed', collection: user.setCollection });
        } catch (err) {
            next(err);
        }
    },

    async updateSet(req, res, next) {
        try {
            const { setNum } = req.params;
            const { quantity } = req.body;

            if (!Number.isInteger(quantity) || quantity < 0) {
                return res.status(400).json({ error: 'Quantity must be a positive integer' });
            }

            if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            
            const setIndex = user.setCollection.findIndex(s => s.setNum === setNum);
            if (setIndex === -1) return res.status(404).json({ error: 'Set not in collection' });

            user.setCollection[setIndex].quantity = quantity;

            await user.save();
            
            console.log(`Quantity of set ${setNum} in ${user.userName}'s collection updated to ${quantity}`);
            return res.status(200).json({ message: 'Set updated successfully', set: user.setCollection[setIndex] });
        } catch (err) {
            next(err);
        }
    },

    async getCollection(req, res, next) {
        try {
            if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            return res.status(200).json({ collection: user.setCollection });
        } catch (err) {
            next(err);
        }
    },

    async getSet(req, res, next) {
        try {
            const { setNum } = req.params;

            if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            const set = user.setCollection.find(s => s.setNum === setNum);
            if (!set) return res.status(404).json({ error: 'Set not found in collection' });

            res.status(200).json({ set });
        } catch (err) {
            next(err);
        }
    }    

}

module.exports = collectionController;