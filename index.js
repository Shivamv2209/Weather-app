import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app=express();

const port=3000;

const API_URL="https://api.openweathermap.org/data/2.5";
const yourApiKey=process.env.API_KEY;
// console.log(yourApiKey);
app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
  res.render("index.ejs");
})



app.post("/get-weather",async (req,res)=>{
  try{
  const result = await axios.get(API_URL + "/weather",{
    params:{
      q:req.body.place,
      appid:yourApiKey,
    }
  });
  // console.log(yourApiKey);
  // console.log("loaded api key:",process.env.API_KEY);
  res.render("index.ejs",{content:result.data});
 
  }catch(error){
    console.error("failed to make request",error.message);
    res.render("index.ejs",{
      error:"Incorrect City Name"
    });
  }
});

app.listen(port,()=>{
    console.log(`server is running on the port ${port}`);

})