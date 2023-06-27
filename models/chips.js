const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chipSchema = new Schema({
    name: String,
    no: Number,
    cardPic: String,
    type: Number,
    letter: String,
    effect: String,
    desc: String,
    damage: Number
});

const Chips = mongoose.model('Chips', chipSchema);

module.exports = Chips;