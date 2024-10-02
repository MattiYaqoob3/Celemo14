const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose');
const cors = require("cors")
app.use(express.urlencoded({extended: true}))
const Mydata = require("./models/mySchema"); // this will call ta Schema 
const { console } = require('inspector');


app.use(cors());


app.get("/api/home", (req, res)=>{
  res.json({message:"Matti"})
})

mongoose.connect(`mongodb+srv://matti:12345@node.9ms98.mongodb.net/alldata?retryWrites=true&w=majority&appName=node`)
.then(() =>{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
.catch((err)=> {console.log(err)})


app.post("/api/user", async(req, res)=>{
  res.send("adam")
  const mydata = new Mydata()
  mydata.userNamee = "Lord"
  mydata.save()
 
})

app.get("/api/user", (req, res)=>{
  res.json({
    name: req.body.userName
  })
})