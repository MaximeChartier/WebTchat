const express = require('express');
const notRESTMiddleware = require('./middleware/notRESTMiddleware.js');
const app = express();
const bodyParser = require('body-parser')

const userRouter = require('./router/userRouter.js')

app
    .use(bodyParser.json())
    .use('/users', userRouter)
    .use(notRESTMiddleware)
    .listen(3000, console.log('started'))