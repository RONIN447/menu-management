const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// category creating 
router.post('/', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// getting the category 
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Geting a category by ID or name
router.get('/:identifier', async (req, res) => {
    try {
        const identifier = req.params.identifier;
        const category = await Category.findOne({
            $or: [{ _id: identifier }, { name: identifier }]
        });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Updating 
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deleting  a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Searching under the  categories by name or tax applicability
router.get('/search', async (req, res) => {
    try {
        const { name, taxApplicability } = req.query;
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (taxApplicability !== undefined) {
            query.taxApplicability = taxApplicability === 'true';
        }
        const categories = await Category.find(query);
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
