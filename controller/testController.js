
const testController  = (req,res)=>{
   try{
    res.status(200).send({
        success:true,
        message:"test user api" 
    })
   }catch(error){
    console.log('error in test api',error);
   }
}

module.exports = {testController}