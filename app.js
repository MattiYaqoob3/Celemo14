const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/mySchema"); // this will call ta Schema
const { console } = require("inspector");

app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) => {
  res.json({ message: "Matti" });
});

mongoose
  .connect(
    `mongodb+srv://matti:12345@node.9ms98.mongodb.net/alldata?retryWrites=true&w=majority&appName=node`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// post a user
app.post("/api/user", async (req, res) => {
  const mydata = new Mydata();

  const name = req.body.username;
  mydata.username = name;
  await mydata.save();
  res.json(mydata);
  console.log(req.body);
});
// find all users
app.get("/api/user", async (req, res) => {
  const usernames = await Mydata.find();
  console.log(usernames);
  res.json(usernames);
});

// find user by id
app.get("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const username = await Mydata.findById(id);
    res.status(200).json(username);
    return;
  } catch (err) {
    console.log("error reading userId", id);
    res.status(500).json({ message: "Server error" });
  }
});

//////////////////////////////////////////////////
//upload a img to aws

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFileToS3 = async (filePath, bucketName, s3FileName) => {
  try {
    const fileContent = fs.readFileSync(filePath);

    const uploadParms = {
      Bucket: bucketName,
      Key: s3FileName,
      Body: fileContent,
      ContentType: "img",
    };
    const result = await s3.send(new PutObjectCommand(uploadParms));
    console.log("File uploaded successfully!", result);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
};

const filePath = "Skärmbild 2024-04-10 145857.png"; /// file patch in the app
const bucketName = "text-1-mj-v2";
const s3FileName = "lord";

uploadFileToS3(filePath, bucketName, s3FileName);
/////////////////////////////////////////

// Send a Email to client
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
require('dotenv').config(); 

// thsi to call the sever with calling the Key 
const ses = new SESClient({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,   
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  },
});
// this cor 

const sendEmail = async () => {
  try {
    const params = {
      Source: "matishahad2009@yahoo.com", 
      Destination: {
        ToAddresses: ["matishahad2009@yahoo.com"], 
      },
      Message: {
        Subject: {
          Data: "Harry Potter", 
        },
        Body: {
          Text: {
            Data: "I love you when you work",
          },
        },
      },
    };

   
    const command = new SendEmailCommand(params);
    const response = await ses.send(command);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendEmail();