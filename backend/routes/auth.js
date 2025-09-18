const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");
//SIGN UP
router.post("/register",async(req,res)=>{
    try{
const {email,username,password}=req.body;
const hashpassword=bcrypt.hashSync(password);
const user=new User({email,username,password:hashpassword});
await user.save().then(()=> 
    res.status(200).json({message:"Sign up succesful!"})
);
    }
    catch(error){
        res.status(200).json({message:"User already exists"});

    }
});

//SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Please sign up first" });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

module.exports=router;