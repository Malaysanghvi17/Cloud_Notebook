const express = require('express');
const mongoose = require('mongoose');
const { validationResult, body } = require('express-validator');


const app = express();

const port = 7300;
const mongoUri = "mongodb://localhost:27017/test"

app.use(express.json())


// connection to database
mongoose.connect(mongoUri).then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    })




// user schema
const userSchema = new mongoose.Schema({
    name:{ 
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
        unique: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const user_template = mongoose.model('user', userSchema);
user_template.createIndexes();




// notes schema
const notesSchema = new mongoose.Schema({
    title:{ 
        type: String,
        require: true,
        unique: true
    },
    textdata:{
        type: String,
        require: true
    },
    tag:{
        type:String, 
        default: "general"
    },
    timestamp:{
        type: Date,
        require: Date.now
    }
});

const notes_template = mongoose.model('notes', notesSchema);




// apis of userlogin

//1. storing user information:
// app.post('/api/auth',[
//     body('name', 'enter a valid name').isLength({min: 3}),
//     body('email', 'enter a valid email address').isEmail(),
//     body('password', 'enter a valid password').isLength({min: 5})
// ], (request, response) => {
//     const result = validationResult(request);
//     if (!result.isEmpty()) {
//         //    return response.send({ errors: result.array() });
//         return response.status(400).json({ errors: result.array() });
//     }
//     console.log(request.body);
//     const user = user_template(request.body);
//     user.save();
//     response.send(request.body);
// })

//2. storing user information:
app.post('/api/auth',[
    body('name', 'enter a valid name').isLength({min: 3}),
    body('email', 'enter a valid email address').isEmail(),
    body('password', 'enter a valid password').isLength({min: 5})
], (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
    //    return response.send({ errors: result.array() });
       return response.status(400).json({ errors: result.array() });
    }

    user_template.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    }).then(user => response.json(user))
    .catch(err => console.log(err));
});


// apis of notes part

// storing notes data:
app.use('/api/notes', (request, response) => {
    console.log(request.body);
    const notes = notes_template(request.body);
    notes.save();
    response.send(request.body);
});



// starting nodejs server
app.listen(port, () => {
    console.log("connected to the port " + port);
});



