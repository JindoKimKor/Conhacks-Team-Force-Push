// server/src/models/Perk.js
const mongoose = require('mongoose');

const perkSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    link: {
        type: String,
        required: [true, 'Deal link is required']
    },
    level: {
        type: Number,
        required: [true, 'Level is required'],
        min: [1, 'Level must be at least 1']
    }
});

const Perk = mongoose.model('Perk', perkSchema);

export default Perk;
