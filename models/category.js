const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true }, // image url
    description: String,
    taxApplicability: { type: Boolean, default: false }, // if tax applicable 
    tax: { type: Number, default: 0 }, // tax rate if applicable
    taxType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' } // type of the tax 
});

module.exports = mongoose.model('Category', categorySchema);
