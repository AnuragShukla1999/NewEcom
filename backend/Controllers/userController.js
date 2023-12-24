import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


// signup
export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashPassword });

    try {
        await newUser.save();
        res.status(200).json({ message: "user created successfully" })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}


// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(401).json('User not found')
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json("Wrong Password")
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, validUser });

    } catch (error) {
        res.status(500).json(error);
    }
}