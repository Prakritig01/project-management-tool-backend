const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

function getToken(email) {
    const secret = 'veryComplexSecret'; // Secret key for signing the token
    const token = jwt.sign({ email }, secret, { expiresIn: '5h' }); // Expires in 5 hours
    return token;
}

// Login function
function login(req, res) {
    const { email, password, role } = req.body;
    console.log("request in role", role);

    User.findOne({ email })
        .then(user => {
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
            });
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).json({ message: 'Server error' });
        });
}


// Signup function
function signup(req, res) {
    const { name, email, password, role } = req.body;

    const newUser = new User({ name, email, password, role });

    newUser.save()
        .then(user => {
            res.status(200).json({
                message: 'User created successfully',
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        })
        .catch(err => {
            console.log('Error creating user:', err);
            res.status(500).json({ message: 'User not created' });
        });
}


// Get User Details function
function getUserDetails(req, res) {
    const { email } = req.params;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
                name: user.name,
                email: user.email,
                role: user.role
            });
        })
        .catch(err => {
            console.error('Error fetching user details:', err);
            res.status(500).json({ message: 'Server error' });
        });
}


function getMembersAndManagers(req, res) {
    User.find({ role: { $in: ['member', 'manager'] } })
        .then(users => {
            const members = users.filter(user => user.role.toLowerCase() === 'member');
            const managers = users.filter(user => user.role.toLowerCase() === 'manager');

            res.status(200).json({
                members,
                managers
            });
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            res.status(500).json({ message: 'Server error' });
        });
}


// Get count of managers
function getManagerCount(req, res) {
    User.countDocuments({ role: 'manager' })
        .then(count => res.status(200).json({ count }))
        .catch(err => {
            console.error('Error fetching manager count:', err);
            res.status(500).json({ message: 'Server error' });
        });
}


// Get count of members
function getMemberCount(req, res) {
    User.countDocuments({ role: 'member' })
        .then(count => res.status(200).json({ count }))
        .catch(err => {
            console.error('Error fetching member count:', err);
            res.status(500).json({ message: 'Server error' });
        });
}

function deleteMember(req,res){
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then((result) =>{
            if(!result){
                return res.status(404).json({message:'User not found'});
            }
            res.status(200).json({message:'User deleted successfully',user:result});
        })
        .catch((err)=>{
            console.error('Error deleting user:',err);
            res.status(500).json({message:'Failed to delete user'});
        });
};

module.exports = { login, signup, getUserDetails, getMembersAndManagers, getManagerCount, getMemberCount, deleteMember };