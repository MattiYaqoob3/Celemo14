const express = require('express')
const app = express()
const port = 3005
const mongoose = require('mongoose');


app.get('/api', (req, res) => {
  res.send('Hello Worssssld!')
})

mongoose.connect(`mongodb+srv://matti:12345@node.9ms98.mongodb.net/?retryWrites=true&w=majority&appName=node`)
.then(() =>{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
.catch((err)=> {console.log(err)})