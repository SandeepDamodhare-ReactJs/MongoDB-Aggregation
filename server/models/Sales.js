const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

const SalesSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    store: { type: String, required: true },
    items: [ItemSchema]
});

const Sales = mongoose.model('Sales', SalesSchema);

module.exports = Sales;
