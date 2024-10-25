import User from "../models/User.js";
import bcryptjs from "bcryptjs";

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