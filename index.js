const express  = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv'); 
const mongoose = require('mongoose');

//dot an configuration 
dotenv.config();

// rest object
const app = express();
//SLaHzqIJ9Jxav8P1   kevinlad819

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

// mongodb 
//  connectedDb;
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
  }
  main().then((d)=>{
    console.log("connected");
  }).catch(err => console.log(err));




//route 
app.use('/api/v1/auth',require('./routes/authRoute.js'))
app.use('/api/v1/user',require('./routes/userRoute.js'))
app.use('/api/v1/resturant',require('./routes/resturantRoute.js'))
app.use('/api/v1/category',require('./routes/categoryRoute.js'))
app.use('/api/v1/foods',require('./routes/foodsRoute.js'))
app.use('/api/v1/cart',require('./routes/cartRoute.js'))




// URL 
app.get('/',(req,res)=>{
    return res.status(200).send("Welcome to eccomerce.")
})

  PORT = process.env.PORT ||6000; 

app.listen(PORT,()=>{
    console.log('Listening port = '+PORT)
});