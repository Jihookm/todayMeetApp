// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const cors = require('cors')
const dotenv = require('dotenv')
const socketio = require('socket.io')

const app = express();

const server = http.createServer(app)

const result = require('./middleware/result');
const routes = require('./router/common');
const config = require('./config/index')
const pool = require('./middleware/pool')

const favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico'))) //favicon 설정

if (config.middleware.cors) app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//REST API
app.use('/', routes); 

const io = socketio(server)

io.on('connection', socket =>  {
    console.log('today connected')

    socket.on('message', message =>  {
        console.log(message[0].text);
        io.emit("message", message);
    })
})

// Load configuration files
dotenv.config({ path : './env' })

app.use(result[config.middleware.result].notFound) // notFoundError
app.use(result[config.middleware.result].other) //error handler

server.listen(process.env.PORT || config.port, async () => {
    const startMsg = `${ process.env.PORT || config.port } port is open!!`
    console.info(startMsg)
})
module.exports = app;