const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { validateUserFields } = require("../services/validationService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    validateUserFields(name, email, password, res);

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1d",
            });

        res.status(200).json({ accessToken });

    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const logoutUser = asyncHandler(async (req, res) => {
    res.json({ message: "Logout" });
});

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
};