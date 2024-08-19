const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    taxApplicability: { type: Boolean, default: null },
    tax: { type: Number, default: null } 
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
