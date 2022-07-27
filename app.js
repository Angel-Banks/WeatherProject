const express = require("express");

const https = require("https");

const app = express();

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "b62af3283ae914a5645d57437d108945#";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      const icon = weatherData.weather[0].icon
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDescription + ".<p>")
      res.write("<h1>The temperature of " + query + " is " + temp + " degrees celsius.<h1>")
      res.write("<img src = " + imageUrl + ">")
      res.send()
    });
  });
});




app.listen(3000, function() {
  console.log("Server is running on Port 3000.");
})
