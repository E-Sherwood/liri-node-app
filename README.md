# LIRI-node-app
##Functionality
*1.* Find the next concert for X band/artist
    *user enters "concert-this" + "(band/artist name)"
    *hits Bands-In-Town API searching for "(band/artist name)"
    *returns soonest upcoming event info for band/artist
*2.* Spotify a song
    *user enters "spotify-this-song" + "(song title)"
    *hits Spotify API searching for "(song title)"
    *returns basic info on the first result for entered song title
*3.* OMDB movie search
    *user enters "movie-this" + "(movie title)"
    *hits OMDB API searching for "(movie title)"
    *returns information on entered movie title
*4.* Do something random
    *coding in progress
##Etc.
*instructions said to default the Spotify song search to "The Sign" by Ace of Base; i decided "Hammer Smashed Face" by Cannibal Corpse was more my style.
*instructions said to default the OMDB search to "Mr. Nobody"; i'm cool with that so i left it alone.
*added a "help" function to give the user some basic instructions.
*realized chalk.js was installed with one of my node packages so i added some colors to the terminal to spice it up
##Known Bugs
*if a band/artist has no upcoming concerts it throws an error in the concert-this functionality. I tried adding in an if statement that will catch it and return "sorry, no upcoming concerts for this band" but i can't get it to work
^^^really if any returned value from API call is undefined it'll throw an error
*if band/artist has upcoming concert outside of the USA it'll only display the city name with a comma
*i can't figure out how to read only certain lines from fs.readFile function, so the do-what-it-says command is currently not working. will read up on line-reader/read + write Streams/pipes to see if that will work. any suggestions? --
##GIF Links of functioning examples
###Warning - Dreadful Resolution, I'm sorry ):

* https://media.giphy.com/media/PMiO5EWggVS8VPz7Ke/giphy.gif -- Help Functionality
* https://media.giphy.com/media/1swuqPT1t6tL5hAsYc/giphy.gif -- Concert Functionality
* https://media.giphy.com/media/3kGmD45ETVlhz35jWC/giphy.gif -- Movie Functionality
* https://media.giphy.com/media/27IHpURHsE44vhdW6o/giphy.gif -- Spotify Functionality
* https://media.giphy.com/media/1eExMesO49U5wyhVJB/giphy.gif -- Random Functionality (or lack of)
* https://media.giphy.com/media/euGkko45aNlyD9p66G/giphy.gif -- Code Overview