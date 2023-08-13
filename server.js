const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// mongoose.connect("mongodb+srv://tayalharsh66:openended@cluster0.3hae0yu.mongodb.net/FacultyMgmt",{ useNewUrlParser: true })
mongoose.connect("mongodb+srv://akhtar-admin:pulsar150@atlascluster.ux104bi.mongodb.net/FacultyMgmt",{ useNewUrlParser: true })

const dbSchema=new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  date_of_join: { type: Date, default: Date.now },
  project:{type: String}
});
const details= mongoose.model("details",dbSchema);
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    // res.send("Haa");
})
app.get("/AddFaculty",(req,res)=>{
    // console.log(__dirname);
    res.sendFile("/AddFaculty.html", {root: __dirname });
})
app.get("/SearchFaculty",(req,res)=>{
    res.sendFile("/SearchFaculty.html", {root: __dirname });
})
app.get("/index.ejs",(req,res)=>{
    details.find({},function(err,detailss){
        res.render("index",{detailedList: detailss});
    })
})
app.post("/",(req,res)=>{
    var todayy = new Date();
    const newDetails=new details({
        name:req.body.name,
        email:req.body.email,
        department:req.body.department,
        date_of_join: todayy,
        project: req.body.project
    })
    newDetails.save();
    res.redirect("/");
})
app.post("/searchFac",(req,res)=>{
    
    details.find({$or:[{name:req.body.search},{email:req.body.search},{department:req.body.search},{project:req.body.search}]},function(err,detailss){
        res.render("index",{detailedList: detailss});
    })
})
app.listen(3000,function(){
    console.log("Server started at port 3000.");
})
