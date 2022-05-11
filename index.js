const express = require('express');
const helmet = require('helmet')
const connectDb = require('./config/database');
const app = express();
const cors=require("cors");
//secure the api
app.use(helmet());




//custom cors settings
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions))


//conect to mongodb

connectDb();


app.use(express.json({extended: false}))


// Routes

app.use('/', require('./routes/index'));
app.use('/api/url/', require('./routes/url'));


const PORT = 3000;

app.listen(process.env.PORT || PORT, () => console.log(`Started server on ${PORT}`));
