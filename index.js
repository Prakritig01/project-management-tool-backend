const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRouter = require('./routes/taskRoutes');
const authController = require('./controllers/authController');
const projectRouter = require('./routes/projectRoutes');


const USER_NAME = "prakriti_01";
const PASSWORD = 'prakriti1112';
const DB_NAME = 'ProjectManagementDB';
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.khab0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;


//creating an app
const app = express();
let port = 3020;


//connecting to the database
mongoose.connect(DB_URI)
    .then(() => {
        console.log("connected to database");
        app.listen(port, (req, res) => {
            console.log(`server started on port ${port}`);
        })
    })
    .catch((err) => {
        console.error('Failed to connect to database', err);
        process.exit(1); // Exit the process with a failure code
    })


const corsObj = {
    origin: "http://localhost:3000",
    credentials: true
}

app.use(cors(corsObj));
app.use(express.json());

//getting the home page
app.get('/', (req, res) => {
    res.send("Welcome to the project management tool");
})


//login
app.post('/login', authController.login);


//signup
//before post request, we need to parse the body
app.post('/signup', authController.signup);

//get user details
app.get('/user/:email', authController.getUserDetails);


//task routes
app.use('/tasks', taskRouter);

//project routes
app.use('/projects', projectRouter);



