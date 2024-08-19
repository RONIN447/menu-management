const express = require('express');
const router = express.Router();
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');

// subcategry creating 
router.post('/', async (req, res) => {
    try {
        const { categoryId, taxApplicability, tax } = req.body;
        const category = await Category.findById(categoryId);

        // Default to category's tax settings if not provided
        if (taxApplicability === null || tax === null) {
            req.body.taxApplicability = category.taxApplicability;
            req.body.tax = category.tax;
        }

        const subcategory = new Subcategory(req.body);
        await subcategory.save();
        res.status(201).json(subcategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// getting all the subcategories 
router.get('/', async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('categoryId');
        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// all subcategory under a category 
router.get('/category/:categoryId', async (req, res) => {
    try {
        const subcategories = await Subcategory.find({ categoryId: req.params.categoryId }).populate('categoryId');
        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// getting a subcategory by ID or name 
router.get('/:identifier', async (req, res) => {
    try {
        const identifier = req.params.identifier;
        const subcategory = await Subcategory.findOne({
            $or: [{ _id: identifier }, { name: identifier }]
        }).populate('categoryId');
        if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });
        res.json(subcategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Updating
router.put('/:id', async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });
        res.json(subcategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// delelting 
router.delete('/:id', async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });
        res.json({ message: 'Subcategory deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
