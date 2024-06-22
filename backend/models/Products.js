const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Ruha', 'Cipő', 'Egyéb'], required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);