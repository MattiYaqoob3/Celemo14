const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose');
const cors = require("cors")

app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hello Worssssld!')
})

app.get("/api/home", (req, res)=>{
  res.json({message:"Matti"})
})

mongoose.connect(`mongodb+srv://matti:12345@node.9ms98.mongodb.net/?retryWrites=true&w=majority&appName=node`)
.then(() =>{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
.catch((err)=> {console.log(err)})