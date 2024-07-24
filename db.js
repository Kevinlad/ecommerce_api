const mongoose = require('mongoose');

 const connectedDb = async()=>{
    try{
        await mongoose.connect('mongodb+srv://kevinlad819:SLaHzqIJ9Jxav8P1@ecommerce.dvi1jcy.mongodb.net/');
        console.log('Connected to database')
    }catch(error){
        console.log('DB error',error);
    }
}


module.exports = connectedDb;