const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;



app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/', function(req, res){
    var city = req.body.cityName;
    const apiKey = "940cfdf280efbd333defca05f70d106f";
    var units = "metric";
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;

    https.get(weatherApiUrl, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;//select temp key from the json objects
            var weatherDis = weatherData.weather[0].description;
            var weatherIcon = weatherData.weather[0].icon;
            var weatherIconUrl = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            res.write("<h1>"+city+" weather is "+weatherDis+" and temprature is "+temp+" celcuis </h1>");
            res.write("<img src='"+weatherIconUrl+"'>");
            res.send();
        });
    });

});

app.listen(port, function(){
    console.log("Server is listening on "+port);
});