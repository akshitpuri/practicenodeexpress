const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    
    const query = req.body.cityName;
    const appid = "14311cc0da52d0973f8dbb09ec15402a";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const desp = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            
            res.write("<p>The weather is currentlty " + desp+ "</p>");
            res.write("<h1>The temperature in "+query+" is "+ temp + "degrees celcius.</h1>")
            res.write("<img src="+imageurl+">");
            res.send();
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
});