// * async error handling and environment
require('express-async-errors');
require('dotenv').config({path: './env/.env'})


// * express
const express = require('express');
const app = express();

const morgan = require('morgan')

// * DB
const connectDB = require('./db/connect');

// * PORT Default
const port =  process.env.PORT;

// * Middlewares 
const notFoundMiddleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')


// 1- So first we run through all the Middlewares, which in this case,
app.use(morgan('tiny'))
app.use(express.json())

// 2- then Express tries to hit all the routes. and if it doesn't find the root,
app.get('/ecommerce', (req,res)=> {
    res.send('Hello World!');
});


// * Handling errors
// 3-  you automatically end up over here. That's very important. That's the 404.
app.use(notFoundMiddleware)
//  why don't we place the errorHandlerMiddleware one before notFoundMiddleware?
// Well, because by express rules, we need to set this one as the last one. And when it comes to invoking this one, well, this middleware, actually, we invoke it from the successful request.
app.use(errorHandlerMiddleware)


// Start Listening the requst
const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port);
        console.log(`The app is runing on port ${port}...`)
    } catch (error) {
        console.log(error.message);
    }
}
start();