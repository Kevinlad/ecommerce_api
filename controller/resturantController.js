const resturantModel = require("../models/resturantModel.js");

createResturantController = async (req,res)=>{
try{
    const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords }=req.body;
    //validation
    if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:"please provided me name and address"
        })
    }
    const newResturant = new resturantModel({
        title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords
    });
    await newResturant.save();
    res.status(200).send({
        success:true,
        message:"New Resturant created successfully"
    })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error increate Resturant APi",
        error

    })
}
}

getAllResturant = async(req,res)=>{
    try{
        const resturant = await resturantModel.find({});
        if(!resturant){
            res.status(404).send({
                success:false,
                message:"No resturant aviable"
            })
        }
        res.status(200).send({
            success:true,
            totalCount:resturant.length,
            resturant 
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:"Error in get all API"
        })
    }
}

getResturantById = async(req,res)=>{
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            res.status(404).send({
                success:false,
                message:"Please provide the Resturant ID "
            })
        }
        //find resturant
        const resturant = await resturantModel.findById(resturantId);
        if(!resturant){
            res.status(404).send({
                success:false,
                message:"No resturant found  "
            }) 

        }

        res.status(200).send({
            success:true,
            resturant
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Resturant By ID"
        })
    }
}

//DELETE RESTRURNAT
const deleteResturantController = async (req, res) => {
    try {
      const resturantId = req.params.id;
      if (!resturantId) {
        return res.status(404).send({
          success: false,
          message: "No Resturant Found OR Provide Resturant ID",
        });
      }
      await resturantModel.findByIdAndDelete(resturantId);
      res.status(200).send({
        success: true,
        message: "Resturant Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in delete resturant api",
        error,
      });
    }
  };
  
module.exports = {createResturantController,getAllResturant,getResturantById,deleteResturantController};