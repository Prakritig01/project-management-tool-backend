const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

function getToken(email) {
    const secret = 'veryComplexSecret'; // Secret key for signing the token
    const token = jwt.sign({ email }, secret, { expiresIn: '5h' }); // Expires in 5 hours
    return token;
}

// Login function
async function login(req, res) {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.password !== password || user.role.toLowerCase() !== role.toLowerCase()) {
            return res.status(401).json({ message: 'Incorrect password or role' });
        }

        const token = getToken(user.email);
        console.log(token);
        return res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: token
        }
        );
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

// Signup function
async function signup(req, res) {
    const { name, email, password, role } = req.body;

    try {
        const newUser = new User({ name, email, password, role });
        const user = await newUser.save();

        // const token = getToken(user.email);
        // // Set token in HTTP-only cookie
        // res.cookie('authToken', token, {
        //     httpOnly: true,
        //     maxAge: 5 * 60 * 60 * 1000, // 5 hours
        //     sameSite: 'None',
        //     secure: false // Set to true if using HTTPS
        // });

        res.status(200).json({
            message: 'User created successfully',
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        console.log('Error creating user:', err);
        res.status(500).json({ message: 'User not created' });
    }
}

// Get User Details function
async function getUserDetails(req, res) {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getMembersAndManagers(req, res) {
    try {
        const users = await User.find({ role: { $in: ['member', 'manager'] } });
        const members = users.filter(user => user.role.toLowerCase() === 'member');
        const managers = users.filter(user => user.role.toLowerCase() === 'manager');

        res.status(200).json({
            members,
            managers
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { login, signup, getUserDetails, getMembersAndManagers };
