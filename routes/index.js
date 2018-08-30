const express = require('express');
const router = express.Router();
const request = require('request');

const apiKey = process.env.WEATHER_KEY;

/* GET home page. */
router.get('/', (req, res) => {
  var city = '';
  res.render('index', { title: 'Express', weather: null, error: null });
});

/* POST home page */
router.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        console.log(weather);
        res.render('index', {weather: null, error: 'Error, please try again, weather.main is null'});
      } else {
        console.log(weather);
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
        res.render('index', { title: 'will it rain?', weather: weatherText, error: null});
      }
    }
  })


  
});

module.exports = router;
