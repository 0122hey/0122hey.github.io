'use strict';

const clock = document.querySelector(".js-clock"),
    clockObj = {
        clock12: clock.querySelector(".js-clock-12"),
        hours: clock.querySelector(".js-clock-hours"),
        minutes: clock.querySelector(".js-clock-minutes"),
        seconds: clock.querySelector(".js-clock-seconds"),
    };
const { clock12, hours, minutes, seconds } = clockObj;

const geo = document.querySelector(".js-geo"),
    geoObj = {
        weather: geo.querySelector(".js-geo-weather"),
        degree: geo.querySelector(".js-geo-degree"),
        location: geo.querySelector(".js-geo-location")
    },
    COORDS = 'coords',
    API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

const { weather, degree, location } = geoObj;


function addZero(time) {
    return time < 10 ? `0${time}` : time;
}

function time12(hour) {
    return hour < 12 ? "AM" : "PM";
}

export function printTime() {
    const date = new Date(),
        dateObj = {
            hours: addZero(date.getHours()),
            minutes: addZero(date.getMinutes()),
            seconds: addZero(date.getSeconds())
        };

    hours.innerText = dateObj.hours;
    minutes.innerText = dateObj.minutes;
    seconds.innerText = dateObj.seconds;
    clock12.innerText = time12(date.getHours());
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temp = String(json.main.temp).split("."),
                place = json.name,
                wt = json.weather[0].main;

            degree.innerHTML = `${temp[0]}℃`;
            location.innerText = place;
            weather.innerText = wt;
        })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function geoSucces(position) {
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function geoError() {
    console.log("Geolocation Error");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(geoSucces, geoError);
}

export function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}