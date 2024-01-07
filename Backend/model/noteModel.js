const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
}, {timestamps: true});

const Notes = new mongoose.model("Note", noteSchema);

module.exports = Notes;
