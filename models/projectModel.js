const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model for the manager
        required: true
    },
    deadline: {
        type: Date,  // Date type for the deadline
        required: true  // You can set this to false if it's optional
    }

},{timestamps: true});

const collectionName = 'ProjectCollections';
const projectModel = mongoose.model('projectModel', projectSchema, collectionName);

module.exports = projectModel;