const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const NoteSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title : {
        type : String,
        require : true
    },
    desciption : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('notes', NoteSchema)