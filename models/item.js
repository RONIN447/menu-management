const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: String,
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    taxApplicability: { type: Boolean, default: null }, 
    tax: { type: Number, default: null }, 
    baseAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number }
});

// for calculating the total amount 
itemSchema.pre('save', function(next) {
    this.totalAmount = this.baseAmount - this.discount;
    next();
});

module.exports = mongoose.model('Item', itemSchema);
