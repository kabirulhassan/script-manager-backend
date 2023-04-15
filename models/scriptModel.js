const mongoose = require('mongoose');

const scriptSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Please add a title"],
    },
    scriptBody: {
        type: String,
        required: [true, "Please add a script body"],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Script", scriptSchema);