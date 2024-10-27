import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({
            message: "User created successfully!",
            user
        })
    } catch (error) {
        res.status(422).json(error);
    }
}

export const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user) {
            const passwordOk = bcryptjs.compareSync(password, user.password);
            if(passwordOk) {
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);
                const { password: pass, ...rest} = user._doc;
                res.cookie('token', token, { httpOnly: true, expires : new Date(Date.now() + 24 * 60 * 60 * 1000) }).status(200).json({
                    message: "Login Successful!",
                    rest
                });
            } else {
                res.status(422).json('Incorrect password')
            }
        } else {
            res.status(422).json('User not found');
        }
    } catch (error) {
        res.status(422)/json(error);
    }
}

export const userProfile = async(req, res) => {
    const { token } = req.cookies;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if(err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        })
    } else {
        res.json(null);
    }
}