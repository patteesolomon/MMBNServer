const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const db = mongoose.connection;
const usersC = require('./controllers/users.js');
const users = require('./models/users.js');
const chips = require('./models/chips.js');
const chipsC = require('./controllers/chips.js');
require('dotenv').config();

const app = express();
const uri = process.env.MONGO_URI; // lets get a uri
const port = process.env.PORT || 3001;

mongoose.connect(uri, { useNewUrlParser: true }, () => {
    console.log('connected');
}
);
// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); 
app.use(cors());

// route use(s) for posting data 

app.use('/userBase', usersC);
app.use('/battlechips', chipsC);

const seedDataUser = [
    {
        username: "Zero",
        password: "sp8989797986078968"
    },
    {
        username: "Maverick_Hunter_X",
        password: "more23423324324524332"
    }
];
// 0 normal, 1 fire, 2 plant, 
// 3 electric, 4 air, 5 poison,
// 6 space, 7 , 
const seedBattleChips = [
    {
        name: "Cannon",
        no: 001,
        cardPic: "001.png",
        type: 0,
        letter : "A",
        effect: 'Stagger',
        desc: 'A cannon that causes your opponent to stagger for a second.This gives them I frames after the hit. Try to use this as a counter.',
        damage: 20
    },
    {
        name: "Shotgun",
        no: 004,
        cardPic: "004.png",
        type: 0,
        letter: "A",
        effect: "PushOne",
        desc: "This will push your opponent one space back.",
        damage: 10
    },
    {
        name: "CyberSword",
        no: 050,
        cardPic: "050.png",
        type: 0,
        letter: "S",
        effect: "None",
        desc: "A sword for slashing one space ahead of you.",
        damage: 15
    }
];

app.get('/', (req, res) => {
    res.send(`Welcome to the Battle Network API!`);
});
// routes we use fno
app.get('/seed', async (req, res) => {
    await users.deleteMany({});
    await users.insertMany(seedDataUser);
    await chips.deleteMany({});
    await chips.insertMany(seedBattleChips);
    res.send('done!');
});

app.get('/userBase', async (req, res) => {
    res.json(await users.find({}));
});

app.get('/battlechips', async (req, res) => {
    res.json(await chips.find({}));
});

app.listen(port, () => {
    console.log(`Jacking in on port ${port}`);
});