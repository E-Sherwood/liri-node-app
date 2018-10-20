//unchanged values + external file calls
const dotenv = require("dotenv").config();
const request = require("request")
const chalk = require("chalk")
const fs = require("fs")

//chalk-related variables for quicker coding
const green = chalk.green
const red = chalk.red
const blue = chalk.blue
const yellow = chalk.yellow
const divide = green("-".repeat(50))

//unneeded if defined in liri.js???
// const KEYS = require("./keys.js");

const moment = require("./node_modules/moment")
const Spotify = require("./node_modules/node-spotify-api")
const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
const OMDB_URL = process.env.OMDB_URL
const omdbKey  = process.env.omdbKey
let search = process.argv[2]

const help = function(){
    const helpfulLog = [
        blue("Hi, I'm LIRI"),
        "Type " + red('concert-this') + " and a " + red("band/artist name") +" to see info on their next performance",
        "Type " + green('spotify-this-song') + " and a " + green("song name") + " to see useful info on that song",
        "Type " + yellow('movie-this') + " and a " + yellow("movie title") + " to see information on that movie",
        "Type " + blue('do-what-it-says') + " to make me do something " +red("r")+green("a")+yellow("n")+blue("d")+red("o")+green("m")
    ]
    console.log(divide)
    console.log(divide)
    console.log(helpfulLog.join("\n"))
}
//concert search function
const concertSearch = function () {
    let artist = process.argv.slice(3).join(" ");
    const BIT_URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(BIT_URL, function (err, response, body) {
        const JSONdata = JSON.parse(body)[0];
        // if (err){
        //     console.log("sorry, this band has no upcoming concerts")
        // }
        
        let date = moment(JSONdata.datetime).format("MM/DD/YYYY")
        let time = JSONdata.datetime.slice(11, 16)
        let eventData = [
            red("Venue: ") + JSONdata.venue.name,
            red("Location: ") + JSONdata.venue.city + ", " + JSONdata.venue.region,
            red("Date: ") + date,
            red("Time: ") + time
        ].join("\n");
        console.log(divide)
        console.log("searching for the next event starring " + artist)
        console.log(divide)
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
            green("Band Name: ") + data.tracks.items[0].artists[0].name,
            green("Song Name: ") + data.tracks.items[0].name,
            green("Album: ") + data.tracks.items[0].album.name,
            green("Spotify Link: ") + data.tracks.items[0].external_urls.spotify
        ]
        console.log(divide)
        console.log("commencing default search")
        console.log(divide)
        console.log(spotifyData.join("\n"))
    });
}

//Spotify argument search --
const spotifyArgSearch = function () {
    let songName = process.argv.slice(3).join(" ");

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        spotifyData = [
            green("Band Name: ") + data.tracks.items[0].artists[0].name,
            green("Song Name: ") + data.tracks.items[0].name,
            green("Album: ") + data.tracks.items[0].album.name,
            green("Spotify Link: ") + data.tracks.items[0].external_urls.spotify
        ]
        console.log(divide)
        console.log("searching for information on " + songName)
        console.log(divide)
        console.log(spotifyData.join("\n"))
    });
}

//OMDB default search --
const omdbDefaultSearch = function(){
    let movieName = "Mr. Nobody"
    const omdb_URL = OMDB_URL + movieName+ omdbKey
    request(omdb_URL, function(err, response, body){
        let jsonMovie = JSON.parse(body)
        console.log(divide)
        console.log("Searching for movie titled: " + movieName.replaceAll("+", " "))
        console.log(divide)
        let movieData = [
            yellow("Title: ") + jsonMovie.Title,
            yellow("Release Date: ") + jsonMovie.Released,
            yellow("Rating: ") + jsonMovie.Rated,
            yellow("Country: ") + jsonMovie.Country,
            yellow("IMDB Score: ") + jsonMovie.Ratings[0].Value,
            yellow("Rotten Tomatoes Score: ") + jsonMovie.Ratings[1].Value,
            yellow("Language(s): ") + jsonMovie.Language,
            yellow("Actors: ") + jsonMovie.Actors,
            yellow("Plot Summary: ") + jsonMovie.Plot
        ]
        console.log(movieData.join("\n"))
        
    })
}
//replaceAll found function, just to make output a little nicer looking
String.prototype.replaceAll = function(find, replaceWith) {
    return this.split(find).join(replaceWith);   
}
//OMDB argument search --
const omdbArgSearch = function(){
    let movieName = process.argv.slice(3).join("+")
    const omdb_URL = OMDB_URL + movieName+ omdbKey
    request(omdb_URL, function(err, response, body){
        let jsonMovie = JSON.parse(body)
        console.log(divide)
        console.log("Searching for movie titled: " + movieName.replaceAll("+", " "))
        console.log(divide)
        let movieData = [
            yellow("Title: ") + jsonMovie.Title,
            yellow("Release Date: ") + jsonMovie.Released,
            yellow("Rating: ") + jsonMovie.Rated,
            yellow("Country: ") + jsonMovie.Country,
            yellow("IMDB Score: ") + jsonMovie.Ratings[0].Value,
            yellow("Rotten Tomatoes Score: ") + jsonMovie.Ratings[1].Value,
            yellow("Language(s): ") + jsonMovie.Language,
            yellow("Actors: ") + jsonMovie.Actors,
            yellow("Plot Summary: ") + jsonMovie.Plot

        ]
        console.log(movieData.join("\n"))
        
    })
}

//statements checking 3rd argument (concert/spotify/movie/do/help) and running appropriate function
if (search === "concert-this") {
    if (!process.argv[3]) {
        console.log(red("please type in an artist to find their next concert"))
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
//do-what-it-says
//uses `fs` node package
//takes info from inside random.txt and runs it
//ie, movie-this X movie, spotify-this X song
if (search === "do-what-it-says"){

// pseudo-code since I can't figure out how to read specific lines from "fs.readFile" commands 
    
    /* let lineNumber = Math.floor(Math.random(1 * 15) +1)
    fs.readFileSync('random.txt', 'utf8', lineNumber, function(){
    lineNumber.split(",")
    let randSearch = lineNumber[0]
    let randArg = lineNumber[1]
    if (randSearch === spotify-this-song){
        spotifyArgSearch(randArg)
    }
    if (randSearch === "concert-this"){
        conccertSearch(randArg)
    }
    if (randSearch === "movie-this"){
        omdbArgSearch(randArg)
    }
    else {
        console.log(red("some kind of error occurred"))
    }
    })*/
    console.log(red("I'm sorry, that's currently under maintenance. Check back again soon!"))
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