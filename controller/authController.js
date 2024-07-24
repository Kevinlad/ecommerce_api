const userModel = require("../models/userModel");
const { use } = require("../routes/testRoute");
const bcrypt = require('bcryptjs');
const JWT  =require('jsonwebtoken');

registerController = async(req,res)=>{
    try{
        const  {userName,email,password,address,phone,answer } = req.body;

        // validation
        if(!userName||!email||!password||!address || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:"please provide All fields"
            })
        }
        // checking  the user
        const existing = await userModel.findOne({email});
        if(existing){
          return  res.status(500).send({
             success:false,
                message:"This email is already existing"
          })
        }
    

        //hashinh 

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        //Create the user
        const user = await userModel.create({userName,email,password:hashedPassword,address,phone,answer});
        res.status(201).send({
            success:true,
            message:"SuccesFully Registered",
            user
        }) 
       }catch(error){
        console.log(error);

        res.status(500).send({
            success:false,
            message:"Error in Register api",
            error
        })
       }
}

// LOGIN
const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validfatuion
      if (!email || !password) {
        return res.status(500).send({
          success: false,
          message: "Please PRovide EMail OR Password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User Not Found",
        });
      }
      //check user password  | compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
      // token
      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      user.password = undefined;
      res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Login API",
        error,
      });
    }
  };
  



module.exports = {registerController,loginController};