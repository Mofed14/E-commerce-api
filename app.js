// * async error handling and environment
require('express-async-errors');
require('dotenv').config({path: './env/.env'})


// * express
const express = require('express');
const app = express();


// * DB
const connectDB = require('./db/connect');

// * PORT Default
const port =  process.env.PORT;

// * Middlewares 
const notFoundMiddleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')

// * handle json data
app.use(express.json())

app.get('/ecommerce', (req,res)=> {
    res.send('Hello World!');
});


// * Handling errors
app.use(notFoundMiddleware)
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