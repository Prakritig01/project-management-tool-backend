const User = require('../models/userModel');

// Login function
function login(req, res) {
    const { email, password, role } = req.body;

    // Find user by email
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Convert role values to lowercase for case-insensitive comparison
            const formRole = role.toLowerCase();
            const storedRole = user.role.toLowerCase();

            if (user.password !== password || storedRole !== formRole) {
                console.log("Request body role:", formRole);
                console.log("User role:", storedRole);
                return res.status(401).json({ message: 'Incorrect password or role' });
            } else {
                console.log('Password matched!');
                // On successful login, respond with user details and token (if you plan to use JWT later)
                res.status(200).json({
                    message: 'Login successful',
                    user: {
                        name: user.name,
                        email: user.email,
                        role: storedRole,
                    },
                });
            }
        })
        .catch((err) => {
            console.error('Error during login:', err);
            res.status(500).json({ message: 'Server error' });
        });
}

// Signup function
function signup(req, res) {
    const obj = req.body;
    const newUser = new User(obj);
    
    newUser.save()
        .then(() => {
            console.log('User created successfully');
            res.status(200).json({ message: 'User created successfully' });
        })
        .catch((err) => {
            console.log('Error creating user:', err);
            res.status(500).json({ message: 'User not created' });
        });
}

// Get User Details function
function getUserDetails(req, res) {
    const { email } = req.params;  // Assuming email is passed in the URL as a parameter

    // Find user by email
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Send user details (excluding sensitive data like password)
            res.status(200).json({
                name: user.name,
                email: user.email,
                role: user.role
            });
        })
        .catch((err) => {
            console.error('Error fetching user details:', err);
            res.status(500).json({ message: 'Server error' });
        });
}

function getMembersAndManagers(req, res) {
    // Find users by roles
    User.find({ role: { $in: ['member', 'manager'] } }) // Assuming 'member' and 'manager' are the roles
        .then((users) => {
            // Group users by their role
            const members = users.filter(user => user.role.toLowerCase() === 'member');
            const managers = users.filter(user => user.role.toLowerCase() === 'manager');

            res.status(200).json({
                members,
                managers
            });
        })
        .catch((err) => {
            console.error('Error fetching users:', err);
            res.status(500).json({ message: 'Server error' });
        });
}


module.exports = { login, signup, getUserDetails, getMembersAndManagers };
