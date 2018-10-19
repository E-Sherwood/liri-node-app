//unchanged values + external file calls
const dotenv = require("dotenv").config();
const request = require("request")

//unneeded if defined in liri.js???
// const KEYS = require("./keys.js");

const moment = require("./node_modules/moment")
const Spotify = require("./node_modules/node-spotify-api")
const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
let search = process.argv[2]

const help = function(){
    const helpfulLog = [
        "Hi, I'm LIRI",
        "Type 'concert-this' and a band/artist name to see info on their next performance",
        "Type 'spotify-this-song' and a song name to see useful info on that song",
        "Type 'movie-this' and a movie title to see information on that movie",
        "Type 'do-what-it-says' to make me do something random"
    ]
    console.log("-".repeat(50))
    console.log(helpfulLog.join("\n"))
}
//concert search function
const concertSearch = function () {
    let artist = process.argv[3];
    const BIT_URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(BIT_URL, function (err, response, body) {
        const JSONdata = JSON.parse(body)[0];
        // if (JSONdata.datetime === undefined){
        //     console.log("sorry, this band has no upcoming concerts")
        // }
        // else {
        let date = moment(JSONdata.datetime).format("MM/DD/YYYY")
        let time = JSONdata.datetime.slice(11, 16)
        let eventData = [
            "Venue: " + JSONdata.venue.name,
            "Location: " + JSONdata.venue.city + ", " + JSONdata.venue.region,
            "Date: " + date,
            "Time: " + time
        ].join("\n");
        console.log("-".repeat(50))
        console.log("searching for the next event starring " + artist)
        console.log("-".repeat(50))
        console.log(eventData)

    })
}

//Spotify default search --
const spotifyDefaultSearch = function () {

    spotify.search({ type: 'track', query: 'Hammer Smashed Face' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        spotifyData = [
            "Band Name: " + data.tracks.items[0].artists[0].name,
            "Song Name: " + data.tracks.items[0].name,
            "Album: " + data.tracks.items[0].album.name,
            "Spotify Link: " + data.tracks.items[0].external_urls.spotify
        ]
        console.log("commencing default search")
        console.log("-".repeat(50))
        console.log(spotifyData.join("\n"))
    });
}

//Spotify argument search --
const spotifyArgSearch = function () {
    let songName = process.argv[3];

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        spotifyData = [
            "Band Name: " + data.tracks.items[0].artists[0].name,
            "Song Name: " + data.tracks.items[0].name,
            "Album: " + data.tracks.items[0].album.name,
            "Spotify Link: " + data.tracks.items[0].external_urls.spotify
        ]
        console.log("-".repeat(50))
        console.log("searching for information on " + songName)
        console.log("-".repeat(50))
        console.log(spotifyData.join("\n"))
    });
}

//OMDB default search --
const omdbDefaultSearch = function(){

}

//OMDB argument search --
const omdbArgSearch = function(){
    
}

//statements checking 3rd argument (concert/spotify/movie/do/help) and running appropriate function
if (search === "concert-this") {
    if (!process.argv[3]) {
        console.log("please type in an artist to find their next concert")
    }
    else {
        concertSearch()
    }
}
if (search === "spotify-this-song") {
    if (!process.argv[3]) {
        spotifyDefaultSearch();
    }
    else {
        spotifyArgSearch()
    }
}
if (search === "help"){
    help()
}
if (search === "movie-this"){
    if(!process.argv[3]){
        omdbDefaultSearch()
    }
    else {
        omdbArgSearch()
    }
}

//given time, figure out track search with artist passed in to get specific song by specific artist
//if (search === "spotify-this-artist"){
    //if (!process.argv[3]) {
    //    spotifyDefaultArtistSearch();
    //}
    //else {
    //    spotifyArtistArgSearch()
    //}
//}



//movie-this <movie-title>
//searches OMDB API to display movie info 
//title, release year, imdb rating, RT rating, country produced, language of movie, plot of movie, actors in movie
//if no movie passed, default to "Mr. Nobody"

//do-what-it-says
//uses `fs` node package
//takes info from inside random.txt and runs it
//ie, movie-this X movie, spotify-this X song

//console.log('end of code')