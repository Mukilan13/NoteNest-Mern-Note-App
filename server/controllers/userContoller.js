import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from 'bcryptjs'

const signup = async (req, res) => {
    // Getting the data off the request body
    const { firstname, lastname, email, password } = req.body

    // Check if name is entered
    if (!firstname || !lastname) {
        return res.json({ error: 'Name is required' })
    }

    // Check if email is entered
    if (!email) {
        return res.json({ error: 'Email is required' })
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.json({ error: "Valid email address is required" });
    }

    // Check and validate password
    if (!password) {
        return res.json({ error: "Password is required" })
    }

    if (password.length < 6) {
        return res.json({ error: "Password should be atleast 6 characters long" })
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
    
    // Check if email is entered
    if (!email) {
        return res.json({ error: "Email is required" })
    }

    // Check if password is entered
    if (!password) {
        return res.json({ error: "Password is required" })
    }

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