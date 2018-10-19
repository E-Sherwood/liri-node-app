const dotenv = require("dotenv").config();
const request = require("request")
//const KEYS = require("./keys.js");
const moment = require("./node_modules/moment")

//concert-this <artist-bandname here>
//search bands in town api and displays information about upcoming events of that artist
//name of venue, venue location, date of event (mm/dd/yyyy)
let search = process.argv[2]
//console.log("getting here");
const concertSearch = function(){
    let artist = process.argv[3];
    const BIT_URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(BIT_URL, function(err, response, body){
        const JSONdata = JSON.parse(body)[0];
        let date = moment(JSONdata.datetime).format("MM/DD/YYYY")
        let time = JSONdata.datetime.slice(11, 16)
        let eventData = [
            "Venue: " + JSONdata.venue.name,
            "Location: " + JSONdata.venue.city + ", " + JSONdata.venue.region,
            "Date: " +  date,
            "Time: " + time
        ].join("\n");
        console.log("searching for the next event starring " + artist)
        console.log("-".repeat(50))
        console.log(eventData)
    })
}

if(search === "concert-this"){
  if (!process.argv[3]){
    console.log("please type in an artist to find their next concert")
  }
  else {
    concertSearch()
}}
// switch(search === "spotify-this-song"){
//     case !pro//cess.argv[3]:
//     console.log("test")
//     break;
//     case process.argv[3]:
//     spotifySearch()
// }


//spotify-this-song <song title>
//uses spotify node to search spotify API to show info of song in terminal
//artist, song name, preview link of song from spotify, album
//if no song provided, default to "The Sign" by Ace of Base (gayyyyy, will change later)
//defult song will be Hammer Smashed Face by Cannibal Corpse, idgaf if i lose points on my grade. fuck Ace of Base

//movie-this <movie-title>
//searches OMDB API to display movie info 
//title, release year, imdb rating, RT rating, country produced, language of movie, plot of movie, actors in movie
//if no movie passed, default to "Mr. Nobody"

//do-what-it-says
//uses `fs` node package
//takes info from inside random.txt and runs it
//ie, movie-this X movie, spotify-this X song

//console.log('end of code')