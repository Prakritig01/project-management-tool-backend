const User = require('../models/userModel');

function login(req, res) {
    const { email, password, role } = req.body;

    // Find user by email
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                // User not found
                return res.status(400).json({ message: 'User not found' });
            }
            
            // Convert role values to lowercase for case-insensitive comparison
            const formRole = role.toLowerCase();
            const storedRole = user.role.toLowerCase();
            
            if (user.password !== password || storedRole !== formRole) {
                // Incorrect password or role
                console.log("Request body role:", formRole);
                console.log("User role:", storedRole);
                return res.status(401).json({ message: 'Incorrect password or role' });
            } else {
                // Password and role match
                console.log('Password matched!');
                // Send a response indicating successful login
                res.status(200).json({ message: 'Login successful', role: storedRole });
            }
        })
        .catch((err) => {
            console.error('Error during login:', err);
            // Send a response indicating server error
            res.status(500).json({ message: 'Server error' });
        });
}



function signup(req,res){
    //data aagya obj mei
    const obj = req.body;
    // console.log(obj);

    //new user banana hai
    const newUSer = new User(obj);
    newUSer.save()
        .then((resObj)=>{
            console.log('user created successfully');
            res.send('user created successfully');
        })
        .catch((err)=>{
            res.send('user not created');
            console.log(err);
        })
}


module.exports = {login,signup};


