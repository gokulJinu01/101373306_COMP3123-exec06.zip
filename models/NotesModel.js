const { type } = require('express/lib/response');
const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const noteSchema = new mongoose.Schema({
    noteTitle : {
        type : String,
        required : true
    },
    noteDescription : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        required : true
    },
    dateAdded : {
        type: Date,
        default : Date.now
    },
    dateUpdated : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Note', noteSchema)