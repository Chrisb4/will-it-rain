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
  // let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if(err){
      res.render('index', {title: 'will it rain1?',weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        console.log(weather);
        res.render('index', {title: 'will it rain2?', weather: null, error: 'Error, please try again, weather.main is null'});
      } else {
        console.log(weather);
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
        res.render('index', { title: 'will it rain?', weather: weatherText, error: null});
      }
    }
  });
});

router.post('/forecast', function (req, res) {
  let city = req.body.city;
  // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let url = `http://api.openweathermap.org/data/2.5/forecast?zip=${city}&units=imperial&appid=${apiKey}`;

  request(url, function(err, response, body) {
    if(err){
      res.render('index', {title: 'will it rain1?',weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if(!weather.main == undefined){
        console.log(weather);
        res.render('index', {title: 'will it rain2?', weather: null, error: 'Error, please try again, weather.main is null'});
      } else {
        console.log(weather);
        // let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
        let weatherText = 'weatherText'
        res.render('forecast', { title: 'will it rain?', weather: weatherText, error: null, data: weather});
        // res.json(weather);
      }
    }
  });
});

module.exports = router;
