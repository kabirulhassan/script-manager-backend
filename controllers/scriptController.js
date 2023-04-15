const asyncHandler = require("express-async-handler");
const Script = require("../models/scriptModel");
const mongoose = require("mongoose");
const { validateScriptId, validateScriptFields } = require("../services/validationService");

/**
 * @description Get all scripts
 * @route GET /api/scripts
 * 
 */
const getScripts = asyncHandler(async (req, res) => {
    const scripts = await Script.find({user_id: req.user.id}); // req.user.id is the user id from the token handler middleware
    res.status(200).json(scripts);
});

/**
 * @description Create a script
 * @route POST /api/scripts
 */
const createScript = asyncHandler(async (req, res) => {
    const { title, scriptBody } = req.body;
    validateScriptFields(title, scriptBody, res);

    const script = await Script.create({
        title,
        scriptBody,
        user_id: req.user.id,
    });
    res.status(201).json(script);
});

/**
 * @description Get a script
 * @route GET /api/scripts/:id
 * @access Private
 */
const getScript = asyncHandler(async (req, res) => {
    validateScriptId(req.params.id, res);
    const script = await Script.findById(req.params.id);
    if (!script) {
        res.status(404);
        throw new Error("Script not found");
    }
    res.status(200).json(script);
});

/**
 * @description Update a script
 * @route PUT /api/scripts/:id
 * @param {string} id.path.required - Script ID
 * @access Private
 */
const updateScript = asyncHandler(async (req, res) => {
    const { title, scriptBody } = req.body;
    validateScriptId(req.params.id, res);
    validateScriptFields(title, scriptBody, res);

    const script = await Script.findById(req.params.id);
    if (!script) {
        res.status(404);
        throw new Error("Script not found");
    }

    if(script.user_id != req.user.id) {
        res.status(403);
        throw new Error("User not authorized to edit this script");
    }
    const updatedScript = await Script.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedScript);
});

/**
 * @description Delete a script
 * @route DELETE /api/scripts/:id
 * @param {string} id.path.required - Script ID
 * @access Private
 */
const deleteScript = asyncHandler(async (req, res) => {
    validateScriptId(req.params.id, res);
    const script = await Script.findById(req.params.id);
    if (!script) {
        res.status(404);
        throw new Error("Script not found");
    }
    await Script.findByIdAndDelete(req.params.id);
    res.status(200).json(script);
});

module.exports = {
    getScripts,
    createScript,
    getScript,
    updateScript,
    deleteScript
}