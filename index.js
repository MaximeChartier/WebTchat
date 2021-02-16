const express = require('express');
const app = express();

const userRouter = require('./router/userRouter.js')

app.listen(3000, function() {
    app.use('/users', userRouter)
})