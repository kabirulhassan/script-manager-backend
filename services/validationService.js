const mongoose = require("mongoose");

const validateScriptId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid ID");
    }
}

const validateScriptFields = (title, scriptBody, res) => {
    if (!title || !scriptBody) {
        res.status(400);
        throw new Error("Title and scriptBody are required");
    }
}

const validateUserFields = (name, email, password, res) => {
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Name, email and password are required");
    }
}

module.exports = {
    validateScriptId,
    validateScriptFields,
    validateUserFields,
}