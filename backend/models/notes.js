const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{ 
        type: String,
        require: true,
        unique: true
    },
    textdata:{
        type: String,
        require: true
    },
    tag:{
        type:String, 
        default: "general"
    },
    timestamp:{
        type: Date,
        default: Date.now
        // require: Date.now
    }
});

module.exports = mongoose.model('notes', notesSchema);