const router=require("express").Router();
const User=require("../models/user");
const List=require("../models/list");

//create
router.post("/addtask",async(req,res)=>{
    try{
const {title,body,_id,year,quarter}=req.body;
const existinguser=await User.findById({_id});
if(existinguser){
    const list=new List({title,body,user:existinguser,year,quarter});
    await list.save().then(()=>res.status(200).json({list}));
    existinguser.list.push(list);
    existinguser.save();
}
    }
    catch(error){
console.log("error");
    }
});
//edit
router.put("/edittask/:id",async(req,res)=>{
    try{
        const {title,body}=req.body;
    const list=await List.findByIdAndUpdate(req.params.id,{title,body});
    list.save().then(()=>res.status(200).json({message:"Task edited"}));

    }
    catch(error){
console.log("error");
    }
});
//delete
router.delete("/deletetask/:id",async(req,res)=>{
    try{
const { id }=req.body;
const existinguser=await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});
if(existinguser){
    const list=await List.findByIdAndDelete(req.params.id)
    .then(()=>res.status(200).json({message:"Task deleted"}));
}
    }
    catch(error){
console.log("error");
    }
});
//gettask
router.get("/gettask/:id/:year/:quarter",async(req,res)=>{
    const list=await List.find({user:req.params.id,year:req.params.year,quarter:req.params.quarter}).sort({createdAt:-1});
    if(list.length!==0){
        res.status(200).json({list:list});
    }
    else{
        res.status(200).json({"message":"NO TASKS"});
    }
})
module.exports=router;
