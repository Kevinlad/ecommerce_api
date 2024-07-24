const categoryModels = require("../models/categoryModels");
const { getAllResturant } = require("./resturantController");
const { updateController } = require("./userController");

categoryController =  async(req,res)=>{
    try{
        const{title,imageUrl} = req.body;
        if(!title){
            res.status(500).send({
                success:false,
                message:"Please enter the title"
            })
        }
        const newCategory =new categoryModels({title,imageUrl});

        await newCategory.save(); 
        res.status(200).send({
            success:true,
            message:"New category created",
            newCategory
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in create the category ",
            error
        })
    }
}

/// GET ALL 

getAllController = async (req,res)=>{
    try{
        const categorys = await categoryModels.find({});
        if(!categorys){
            res.status(404).send({
                success:false,
                message:"No Categories found",

            })
        }
        res.status(200).send({

            success:true,
            totalCount:categorys.length,
            message:"Categories Found",
            categorys
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in get All the category",
            error
        })
    }
}
//UPDATE THE category
updateCategory = async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,imageUrl} = req.body;
        const updateCategory = await categoryModels.findByIdAndUpdate(id,{title},{new:true});
        if(!updateCategory){
            return res.status(404).send({
                success:false,
                message:"No category found",

            });
        }    
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            updateCategory
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update the category",
            error
        })
    }
}

deleteCategory = async(req,res)=>{
    try{
        const {id}=req.params;
        if(!id){
            res.status(404).send({
                success:false,
                message:"Please provide category id",
            })
        }
        const category = await categoryModels.findById(id);
        if(!category){
            res.status(404).send({
                success:false,
                message:"No category found with id"
            })
        }
        await categoryModels.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"ERROR in delete category",
            error
        })
    }
}


module.exports = {categoryController,getAllController,updateCategory,deleteCategory};