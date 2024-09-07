const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,

    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    role : {
        type : String,
        required : true,
        trim : true
    }
},{timestamps : true});

const collectionName = 'UserCollections';
const userModel = mongoose.model('userModel', userSchema, collectionName);

module.exports = userModel;