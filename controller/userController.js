const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');


// GET THE USER
 getController = async(req,res)=>{
    try{
      
        const user= await userModel.findById({_id:req.body.id,})
        console.log(user)
        // validation
        if(!user){
            res.send(404).send({
                success:false,
                message:"User Not Found"
            })
        }
           //hide password

            user.password = undefined;

            //response
            res.status(200).send({
                success:true,
                message:"user get successfully ",
                user
            })
        
    }catch(error){
        res.status(500).send({
            success:false,
            message:"Error in get API",
            error
        })
    }
}
// UPDATE PROFILE
updateController =async (req,res)=>{
    try{
    const user = await userModel.findById({_id:req.body.id});
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Error in update user API "
        })

    }

    const {userName,address,phone}=req.body;
    if(userName) user.userName = userName;
    if(address) user.address = address;
    if(phone) user.phone = phone;
    await user.save();
    res.status(200).send({
        success:true,
        message:"user updated successfully",
    })
    } catch(error){
        console.log(error);
        res.status(200).send({
            success:false,
            message:"Error in Update User API ",
            error
        })
    }
}

// password changed
updatePasswordController= async (req,res)=>{
    try{
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User Not Found "
            })
        }

        // get data from user

        const {oldPassword,newPassword}=req.body;
        if(!oldPassword,  !newPassword){
            return res.send({
                success:false,
                message:"Please provide old or new password"
            })
        }
         //check user password  | compare password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid old Password",
        });
      }
      // hashing password
      var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword ,salt);
        user.password = hashedPassword

        //SAVED PASSWORD
        await user.save();
        res.status(200).send({
            success:true,
            message:"Passsword Updated"

        })
    }catch(error){
        console.log(error);
        res.status(200).send({
            success:false,
            message:"Error in Password Update User API ",
            error
        })
    }
}

// RESET PASSWORD
resetPasswordController = async(req,res)=>{
    try{
        const {email,newPassword,answer}=req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"Please provide All fields"
            })
        }

        const user = await userModel.findOne({email,answer});
        if(!user){
            res.status(500).send({
                success:false,
                message:"user not found or invalid"
            })
        }
              // hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword ,salt);
      user.password = hashedPassword
      await user.save();
      res.status(200).send({
        success:true,
        message:"Passsword Reset Updated"

    })
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in password update",
            error
        })
    }
}
// DELETE PROFILE
deleteProfileController = async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Your Account is Deleted",
        
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Delete Profile Api",
            error
        })
    }
}
module.exports = {getController,updateController,updatePasswordController,resetPasswordController,deleteProfileController};