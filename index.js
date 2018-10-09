const express = require('express');
const helmet = require('helmet');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send("It's Alive");
});

server.get('/api/courses', (req,res)=>{
    db('courses')
    .then(course => {
        res.status(200).json(courses);
    })
    .catch(err => res.statusMessage(500).json(err));
});

server.post('/api/courses', (req,res) =>{
    const course=req.body;
    db.insert(course)
    .into('courses')
    .then(ids => {
        res.status(201).json(ids[0]);
    })
    .catch(err =>{
        res.status(500).json(err);
    });
});

server.listen(9000, () => console.log('\nAPI running on 9k\n'));