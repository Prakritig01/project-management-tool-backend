const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRouter = require('./routes/taskRoutes');
const authController = require('./controllers/authController');
const projectRouter = require('./routes/projectRoutes');
const User = require('./models/userModel');

const USER_NAME = "prakriti_01";
const PASSWORD = 'prakriti1112';
const DB_NAME = 'ProjectManagementDB';
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.khab0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;

// Creating an app
const app = express();
const port = 3020;

// Connecting to the database
mongoose.connect(DB_URI)
    .then(() => {
        console.log("Connected to database");
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database', err);
        process.exit(1); // Exit the process with a failure code
    });

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.send("Welcome to the project management tool");
});

// Route to get the user data by user ID or email
app.get('/get-username/:id', async (req, res) => {
    try {
        const userId = req.params.id; // You can also use req.query or req.body based on how you pass the ID
        const user = await User.findById(userId); // Fetch user by ID from the database

        if (user) {
            res.status(200).json({ name: user.name }); // Send the name back to the frontend
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', authController.login);
app.post('/signup', authController.signup);
app.get('/members-and-managers', authController.getMembersAndManagers);
app.get('/user/:email', authController.getUserDetails);
app.get('/auth/manager-count', authController.getManagerCount);
app.get('/auth/member-count', authController.getMemberCount);
app.delete('/delete-member/:id', authController.deleteMember);


app.use('/tasks', taskRouter);
app.use('/projects', projectRouter);

module.exports = app;
