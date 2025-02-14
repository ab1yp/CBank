//import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//import express library
const app = express();
app.use(cors());
app.use(express.json()); // لازم عشان يرجع JSON
app.use(express.urlencoded({ extended: true }));
  

// connect to mongoDB
mongoose.connect('mongodb+srv://mangodb2025:mangodb2025@mangodb.jw0ti.mongodb.net/CBank')
.then(() => console.log('MongoDB connection established!'))
.catch(() => console.error('MongoDB connection error:'));

// create schema for database
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // تعريف _id كـ String
    userId: { type: String, required: true },
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    phone: { type: String, required: true },
    location: { type: String, required: true },
    age: { type: Number, required: true }, // العمر كـ Number
    skills: { type: [String], required: true }, // المصفوفة كـ Array of Strings
    experience: { type: String, required: true },
    summary: { type: String, required: true },
    profile: { type: String, required: true },
    
});
const User = mongoose.model('User', userSchema);

const emailSchema = new mongoose.Schema({
    senderId: {type: 'string', required: true},
    receiverId: {type: 'string', required: true},
    title: {type: 'string', required: true},
    content: {type: 'string', required: true},
    timestamp: {type: 'date', required: true}
})
const Email = mongoose.model('Email', emailSchema)

const operatorSchema = new mongoose.Schema({
    senderId: { type: 'string', required: true },
    receiverId: { type: 'string', required: true },
    title: { type: 'string', required: true },
    content: { type: 'string', required: true },
    startTime: { type: 'Date', required: true },
    endTime: { type: 'Date', required: true },
    estimatedTime: { type: 'string', required: true },
});

const Operator = mongoose.model('Operators', operatorSchema)

//create new data (user)
app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save()
});

app.get('/users/user/:userId', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findOne({_id: userId});
    res.json(user)
})
// read all data (users) from database
app.get('/users', async (req, res) => {
        const users = await User.find().lean();
        res.json(users);
});




//update data (user)
app.put('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body );
    res.json(updatedUser);
})

//delete data (user)
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
})

//check email in databse already
app.get('/users/email/:email', async (req, res) => {
    const email = req.params.email
    const check = await User.findOne({email});
    if (check === null || undefined) {
        res.json(true);
    }else {
        res.json(false);
    }
})
//check email in databse already in sing up
app.get('/users/signin/email/:email', async (req, res) => {
    const email = req.params.email
    const output = await User.findOne({email});
    res.json(output)
})
app.get('/users/signin/receiverId/:email', async (req, res) => {
    const email = req.params.email
    const user = await User.findOne({email});
    res.json(user._id)
})

//check password in databse already in sing up
app.get('/users/signin/passwords/:password', async (req, res) => {
    const password = req.params.password
    const output = await User.find({password});
    res.json(output)
})

app.get('/emails/receiverId/:receiverId', async (req, res) => {
    const receiverId = req.params.receiverId
    const emails = await Email.find({ receiverId });
    res.json(emails)
})

app.get('/operator/receiverId/:receiverId', async (req, res) => {
    const receiverId = req.params.receiverId
    const operators = await Operator.find({ receiverId });
    res.json(operators)
})



// port number
const PORT = process.env.PORT || 3000;

// run server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);})
