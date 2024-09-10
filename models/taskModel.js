const mongoose = require('mongoose');
const User = require('./userModel');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true,
    },
    description :{
        type : String,
        required : true,
        trim : true,
    },
    deadline : {
        type : String,
        required : true,
        trim : true
    },
    priority : {
        type : String,
        required : true,
        trim : true
    },
    status : {
        type : String,
        required : true,
        trim : true
    },
    members : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true});

const collectionName = 'TaskCollections';
const taskModel = mongoose.model('taskModel', taskSchema, collectionName);

module.exports = taskModel;