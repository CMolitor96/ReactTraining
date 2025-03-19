// Section 1

console.log(1+2) //3
console.log("Apple" + "Orange") //AppleOrange
console.log(1 + 2 + "apple") //3apple
console.log("apple" + 1 + 2) //apple12
console.log(1 + true) //2
console.log(0 == false) //true
console.log(1 === true) //false
console.log(2 == "2") //true

// Section 2

let cricketTeamPlayers = ["Adam", "Beth", "Charlie", "David", "Eve", "Frank", "Garrett", "Henry", "Ignacio", "Jack", "Kat"]
console.log(cricketTeamPlayers.length);
let injuredPlayer = cricketTeamPlayers.shift();
console.log(injuredPlayer);
console.log(cricketTeamPlayers.length);
let newPlayer = "Lisa";
cricketTeamPlayers.push(newPlayer);
console.log(cricketTeamPlayers.length);
let alphabeticalCricketTeamPlayers = cricketTeamPlayers.sort();
console.log(alphabeticalCricketTeamPlayers);
let playerJerseys = [];
for (let i = 0; i < cricketTeamPlayers.length; i++) {
    let randomJerseyNumber = Math.floor(Math.random() * 100);
    playerJerseys.push(`${cricketTeamPlayers[i].toUpperCase()} - ${randomJerseyNumber}`)
}
console.log(playerJerseys)

// Section 3
function numbers() {
    for (let i = 1; i < 101; i++) {
        console.log(i)
    }
}
numbers();

function date() {
    let date = new Date();
    let formattedDate = date.toLocaleDateString('en-GB');
    console.log(formattedDate);
}
date();

function cToF(celcius) {
    let fahrenheit = (celcius * 9/5) + 32;
    return fahrenheit;
}
console.log(cToF(23));

function reverse(string) {
    let reverseString = []
    for (let i = string.length -1; i >= 0; i--) {
        reverseString.push(string[i])
    }
    return reverseString
}
console.log(reverse([1,2,3]));

// Section 4
let movieObjectsList = [
    {
        title: "Jaws",
        ratings: [8,9,8]
    },
    {
        title: "The Prestige",
        ratings: [9,9,10]
    },
    {
        title: "Sharkboy and Lavagirl",
        ratings: [2,3,1]
    }
];
function averageRatingOfMovie(objectList) {
    function getAverage(array) {
        let sum = 0;
        array.forEach(value => {
            sum += value;
        })
        return sum/(array.length);
    }
    for (let i = 0; i < objectList.length; i++) {
        console.log(`${objectList[i].title} - Average Rating: ${getAverage(objectList[i].ratings)}`)
    }
}
averageRatingOfMovie(movieObjectsList);

function filterMovies(objectList) {
    function getAverage(array) {
        let sum = 0;
        array.forEach(value => {
            sum += value;
        })
        if (sum/(array.length) > 4) {
            return true;
        } else {
            return false;
        }
    }
    let filteredMovies = [];
    for (let i = 0; i < objectList.length; i++) {
        if (getAverage(objectList[i].ratings)) {
            filteredMovies.push(objectList[i].title)
        }
    }
    return filteredMovies;
}
console.log(filterMovies(movieObjectsList));

function highestRatedMovie(objectList) {
    let highestMovie = '';
    let average = 0;
    function getAverage(array) {
        let sum = 0;
        array.forEach(value => {
            sum += value;
        })
        return sum/(array.length);
    }
    for (let i = 0; i < objectList.length; i++) {
        let averageRating = getAverage(objectList[i].ratings);
        if (averageRating > average) {
            average = averageRating
            highestMovie = objectList[i].title;
        }
    }
    return highestMovie
}

console.log(highestRatedMovie(movieObjectsList))