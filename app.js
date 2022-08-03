const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const WebSocket = require('ws')

const socket = new WebSocket('ws://3.221.144.175');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

app.use(helmet());

app.use(express.json());

app.use(morgan('dev'));

app.get('/pump/on', (req, res, next) => {
    // Create a new WebSocket.
    try{
        socket.send( "TURN_ON_PUMP");
        res.json({ res: 'PUMP_ON' });
    }
    catch (e){
        res.json({res: e})
    }



});

module.exports = app;