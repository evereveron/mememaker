var express = require('express');
//var $ = jquery = require('jquery');
var fs = require('fs');

var app = express();
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
console.log('starting app at localhost:5000...');

app.get('/', function(req, res) {
    console.log('home');
    res.render('pages/index');  
});

app.get('/learn', function(req, res) {
    console.log('learn');
    
    res.render('pages/learn');
});

app.get('/connect', function(req, res) {
    console.log('connect');
    res.render('pages/connect');
});

var TwitterPosts, streamOfTweets;
TwitterPosts = require('twitter-screen-scrape');
 
streamOfTweets = new TwitterPosts({
  username: 'realDonaldTrump',
  retweets: false
});
 
streamOfTweets.on('readable', function() {
  var time, tweet;
  tweet = streamOfTweets.read();
  time = new Date(tweet.time * 1000);
  console.log([
    "drumpf's tweet from ",
    time.toLocaleDateString(),
    " got ",
    tweet.favorite,
    " favorites, ",
    tweet.reply,
    " replies, and ",
    tweet.retweet,
    " retweets...",
    tweet.text
  ].join(''));
});

//app.listen(8000);
