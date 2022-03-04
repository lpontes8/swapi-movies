const titleDisplayed = document.getElementById("title");
const episodeDisplayed = document.getElementById("episode");
const openingDisplayed = document.getElementById("opening");
const directorDiplayed = document.getElementById("director");
const producerDisplayed = document.getElementById("producer");
const releaseDateDisplayed = document.getElementById("release-date");
const iconDisplayed = document.getElementById("icon");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

let indexIconDisplayed = 0;
const iconsArray = ["chewbacca", "darth-vader", "imperio", "luke-skywalker", "phoenix-squadron", "r2-d2", "stormtrooper", "yoda"];


let movieDisplayed = 0;

const apiUrl = "https://swapi.dev/api/films/";

async function fetchMovies(url, desiredMovie) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const moviesData = responseJson.results;

    titleDisplayed.innerText = moviesData[desiredMovie].title;
    episodeDisplayed.innerText = moviesData[desiredMovie].episode_id;
    openingDisplayed.innerText = moviesData[desiredMovie].opening_crawl.replace(/(?:\\[rn]|[\r\n]+)+/g, "");
    directorDiplayed.innerText = moviesData[desiredMovie].director;
    producerDisplayed.innerText = moviesData[desiredMovie].producer;
    releaseDateDisplayed.innerText = moviesData[desiredMovie].release_date;
}

fetchMovies(apiUrl, movieDisplayed);

nextButton.addEventListener("click", () => {
    prevButton.disabled = false;

    if (movieDisplayed < 6) {
        movieDisplayed += 1;
        fetchMovies(apiUrl, movieDisplayed);

        if (movieDisplayed == 6) {
            nextButton.disabled = true;
        }
    }
});

prevButton.addEventListener("click", () => {
    nextButton.disabled = false;

    if (movieDisplayed > 0) {
        movieDisplayed -= 1;
        fetchMovies(apiUrl, movieDisplayed);

        if (movieDisplayed == 0) {
            prevButton.disabled = true;
        }
    }
});

const changeIconDisplayed = () => {
    if (indexIconDisplayed < 7) {
        indexIconDisplayed += 1;
    } else {
        indexIconDisplayed = 0;
    }
    iconDisplayed.src = "./images/" + iconsArray[indexIconDisplayed] + ".svg";
}

window.onload = () => {
    setInterval(() => {
        changeIconDisplayed()
    }, 3000);

};