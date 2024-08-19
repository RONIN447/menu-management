const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');

// Creating  an item
router.post('/', async (req, res) => {
    try {
        const { subcategoryId, taxApplicability, tax } = req.body;
        const subcategory = await Subcategory.findById(subcategoryId);

       
        if (taxApplicability === null || tax === null) {
            req.body.taxApplicability = subcategory.taxApplicability;
            req.body.tax = subcategory.tax;
        }

        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Getting  all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().populate('subcategoryId');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Geting  all items under a category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const subcategories = await Subcategory.find({ categoryId: req.params.categoryId });
        const subcategoryIds = subcategories.map(subcategory => subcategory._id);
        const items = await Item.find({ subcategoryId: { $in: subcategoryIds } }).populate('subcategoryId');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Getting  all items under a sub-category
router.get('/subcategory/:subcategoryId', async (req, res) => {
    try {
        const items = await Item.find({ subcategoryId: req.params.subcategoryId }).populate('subcategoryId');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get an item by ID or name
router.get('/:identifier', async (req, res) => {
    try {
        const identifier = req.params.identifier;
        const item = await Item.findOne({
            $or: [{ _id: identifier }, { name: identifier }]
        }).populate('subcategoryId');
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deleteing an item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Searching the  items by name
router.get('/search', async (req, res) => {
    try {
        const { name } = req.query;
        const items = await Item.find({ name: { $regex: name, $options: 'i' } }).populate('subcategoryId');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
