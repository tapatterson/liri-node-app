// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says-- still need to add this command

//Requesting the npm packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var keys = require("./keys.js");

//Commands to pass my arguments
var command = process.argv[2];
var nextCommand = process.argv[3];

//Keys for Twitter API
var consumer_key = keys.twitterKeys.consumer_key;
var consumer_secret = keys.twitterKeys.consumer_secret;
var access_token_key = keys.twitterKeys.access_token_key;
var access_token_secret = keys.twitterKeys.access_token_secret;

//Object used to call Twitter API
var client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
  });


//Twitter Functions to pull 20 tweets from Twitter page

if (command === "my-tweets") {
	console.log("Latest Tweets Below");
 
  var params = {
    screen_name: 'varCodingQueen',
    count: 20
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {    
   //If no error, run through this loop to post tweets along with time created
    if (!error) {   
      for (i = 0; i<tweets.length; i++){
        var tweetData = ("Number: " + (i+1)+ "\n" + tweets[i].created_at + "\n" + tweets[i].text + "\n");
        console.log(tweetData);
        console.log("---------------------");
      }   
    };
  });


};

;

//Spotify Functions to pull requested song data from Spotify

if (command === "spotify-this-song") {
  var song = process.argv[3];

  //Reads file
  fs.readFile("random.txt", "utf-8", function(error, data){
    if (error){
      return console.log(error);
    }

  })
  //Keys from Spotify API
  var spotify = new Spotify ({
    id: "b019b451a52a4460a3318c5d4d489229",
    secret:"5d761b0c8cc4488a8f2e87fb8080f9f4"
  });
  //Search Spotify for the song name and return data or error
  spotify.search({ type: 'track', query: song, limit:1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
    //How Spotify data will be displayed
    var songName = data.tracks.items[0].name;
    var artistName = data.tracks.items[0].artists[0].name;
    var albumName = data.tracks.items[0].album.name;
    var preview_url = data.tracks.items[0].preview_url;

    console.log("Song: " +songName);
    console.log("Artist: " +artistName);
    console.log("Album: " +albumName);
    console.log("Preview: " +preview_url);
  });
};

// OMDB Functions to show movie data from OMDB website

// Grab the movieName which will always be the third node argument.


if (command === "movie-this") {

  var movieName = process.argv[3];

  //RUn request to OMDB with movie specified
  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&&apikey=40e9cece";
 
    request(url, function(error, response, body){
      if(!error && response.statusCode == 200){
        console.log("Title: " + JSON.parse(body)["Title"]);
        console.log("Year: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country: " + JSON.parse(body)["Country"]);
        console.log("Language: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
        var rater = JSON.parse(body).Ratings[1].Source;
        console.log(rater);
        var value = JSON.parse(body).Ratings[1].Value;
        console.log(rater+" rating is:  "+value);
      }
    })
  }

// To Be completed:
// The do-what-it-says command which just needs to read the random.txt file
// Find a way to input song and movie names without "quotation marks"
// Make wording that prints to the screen more interactive and fun!



