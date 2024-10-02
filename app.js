const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose');
app.use(express.urlencoded({extended: true}))
const Mydata = require("./models/mySchema"); // this will call ta Schema 
const { console } = require('inspector');


app.use(express.json());


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
  const mydata = new Mydata()

  const name = req.body.username
  mydata.username = name
  await mydata.save()
  res.json(mydata)
  console.log(req.body)
})

app.get("/api/user", async(req, res)=>{
 const usernames = await Mydata.find()
 console.log(usernames)
 res.json(usernames)
})