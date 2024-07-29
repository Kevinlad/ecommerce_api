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
app.use('/api/v1/auth',require('../ecommerce-website/routes/authRoute'))
app.use('/api/v1/user',require('../ecommerce-website/routes/userRoute'))
app.use('/api/v1/resturant',require('../ecommerce-website/routes/resturantRoute'))
app.use('/api/v1/category',require('../ecommerce-website/routes/categoryRoute'))
app.use('/api/v1/foods',require('../ecommerce-website/routes/foodsRoute'))



// URL 
app.get('/',(req,res)=>{
    return res.status(200).send("Welcome to eccomerce.")
})

  PORT = process.env.PORT ||6000; 

app.listen(PORT,()=>{
    console.log('Listening port = '+PORT)
});