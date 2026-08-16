const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        default: 'FREE'
    },
    symbol: {
        type: String,
        required: true
    },
    previewClass: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
