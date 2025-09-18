const mongoose=require("mongoose");
const mongoURL='mongodb://127.0.0.1:27017/users';
mongoose.connect(mongoURL,{
    useNewUrlparser: true,
	useUnifiedTopology: true,
})
const db=mongoose.connection;
db.on('connected',()=>{
    console.log('Connected to Mongodb server');
});
db.on('error',(err)=>{
    console.error('Mongodb connection error:',err);
});
db.on('disconnected',()=>{
    console.log('disConnected to Mongodb server');
});
module.exports=db;
