import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from 'bcryptjs'

const signup = async (req, res) => {
    // Getting the data off the request body
    const { firstname, lastname, email, password } = req.body

    // Check if name is entered
    if (!firstname || !lastname) {
        return res.json({ rror: 'Name is required' })
    }

    // Email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.json({ error: "Valid email address is required" });
    }

    // Check and validate password
    if (!password || password.length < 6) {
        return res.json({ error: "Password is required and should be atleast 6 characters long" })
    }

    // Check user
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.json({ error: 'User already exists' })
    }

    // Hashing passsword
    const hashedPassword = await bcrypt.hashSync(password, 10)

    // Create user
    const user = await User.create({ firstname, lastname, email, password: hashedPassword })

    generateToken(res, user._id)

    // Send response
    res.json({ user: user })
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.json({ error: "User doens't exists" })

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (user && passwordMatch) {
        generateToken(res, user._id)
        return res.json({ message: 'Password matched!' })
    } else {
        return res.json({ error: "Invalid email or password" })
    }
}

const logout = (req, res) => {
    res.clearCookie("jwt")
    res.status(200).json({ message: 'User logged out' })
}

export {
    signup,
    login,
    logout
}