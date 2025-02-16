import { getDate, convertTo12HourFormat, getNextDay } from "./date-manager";
export { updateDOM };

import clearDay from "./img/clear-day.jpg";
import clearNight from "./img/clear-night.jpg";
import partlyCloudyDay from "./img/partly-cloudy-day.jpg";
import partlyCloudyNight from "./img/partly-cloudy-night.jpg";
import cloudy from "./img/cloudy.jpg";
import wind from "./img/wind.jpg";
import fog from "./img/fog.jpg";
import rain from "./img/rain.jpg";
import snow from "./img/snow.jpg";
import getWeatherData from "./api-manager";

const weatherMap = {
    snow: { icon: "fa-snowflake", image: snow },
    rain: { icon: "fa-cloud-showers-heavy", image: rain },
    fog: { icon: "fa-smog", image: fog },
    wind: { icon: "fa-wind", image: wind },
    cloudy: { icon: "fa-cloud", image: cloudy },
    "partly-cloudy-day": { icon: "fa-cloud-sun", image: partlyCloudyDay },
    "partly-cloudy-night": { icon: "fa-cloud-moon", image: partlyCloudyNight },
    "clear-day": { icon: "fa-sun", image: clearDay },
    "clear-night": { icon: "fa-moon", image: clearNight },
};

/**********************/

// Body
const body = document.body;

// Main container
const weatherDataSection = document.querySelector(".weather-data-section");

// Current weather
const currentWeatherSection = document.querySelector(
    ".current-weather-section",
);
const locationNameEl = currentWeatherSection.querySelector(".location-name");
const currentTemp = currentWeatherSection.querySelector(
    ".current-weather-section__temperature",
);
const currentIcon = currentWeatherSection.querySelector(
    ".current-weather-section__icon",
);
const weatherDescription = currentWeatherSection.querySelector(
    ".weather-description",
);
const currentDay = currentWeatherSection.querySelector(".current-day");
const currentTime = currentWeatherSection.querySelector(".current-time");

// Next hours' weather
const nextHoursWeather = weatherDataSection.querySelector(
    ".next-hours-weather",
);
const hourWeatherElements = nextHoursWeather.querySelectorAll(
    ".next-hours-weather__hour-weather",
);

// Next days' weather
const nextDaysWeather = weatherDataSection.querySelector(".next-days-weather");
const dayRowElements = nextDaysWeather.querySelectorAll(
    ".next-days-weather__day-row",
);

// Cards
const uvText = weatherDataSection.querySelector(".uv .card__value");
const visibilityText = weatherDataSection.querySelector(
    ".visibility .card__value",
);
const humidityText = weatherDataSection.querySelector(".humidity .card__value");
const rainCard = weatherDataSection.querySelector(".rain");
const rainText = rainCard.querySelector(".card__value");
const rainIcon = rainCard.querySelector(".card__icon");
const rainTitle = rainCard.querySelector(".card__title");

/**********************/

function cleanString(str) {
    const parts = str.split(",");
    if (parts.length < 2) return str;

    const firstPart = parts[0].trim();
    const lastPart = parts[parts.length - 1].trim();

    return `${firstPart}, ${lastPart}`;
}

function updateIcon(iconEl, newValue) {
    iconEl.classList.remove(iconEl.classList.item(2));
    iconEl.classList.add(newValue);
}

function updateCurrentWeather(data) {
    const cc = data.currentConditions;
    locationNameEl.textContent = cleanString(data.resolvedAddress);
    currentTemp.textContent = `${Math.round(cc.feelslike)}°C`;
    updateIcon(currentIcon, weatherMap[cc.icon].icon);
    weatherDescription.textContent = cc.conditions;
    const { day, time } = getDate(data, "short");
    currentDay.textContent = day;
    currentTime.textContent = time;
}

function updateNextHoursWeather(data) {
    const startHour = getDate(data).hour24;

    hourWeatherElements.forEach((card, index) => {
        const totalHours = +startHour + index;
        const dayIndex = Math.floor(totalHours / 24);
        const hourIndex = totalHours % 24;

        const hourData = data.days[dayIndex].hours[hourIndex];

        card.querySelector(".hour-weather__hour").textContent =
            convertTo12HourFormat(hourData.datetime);

        card.querySelector(".hour-weather__temperature").textContent =
            `${Math.round(hourData.feelslike)}°C`;

        updateIcon(
            card.querySelector(".hour-weather__icon"),
            weatherMap[hourData.icon]?.icon || "fa-sun",
        );
    });
}

function updateNextDaysWeather(data) {
    let currentDay = getDate(data, "long").day;
    const days = data.days;

    dayRowElements.forEach((row, index) => {
        const dayEl = row.querySelector(".day-row__day--name");
        const tempEl = row.querySelector(".day-row__day--data__temperature");
        const iconEl = row.querySelector(".day-row__day--data__icon");

        dayEl.textContent = currentDay;
        tempEl.textContent = `${Math.round(days[index].feelslike)}°C`;
        updateIcon(iconEl, weatherMap[days[index].icon].icon);

        currentDay = getNextDay(currentDay);
    });
}

function updateCards(data) {
    const cc = data.currentConditions;
    uvText.textContent = cc.uvindex;
    visibilityText.textContent = `${cc.visibility} km`;
    humidityText.textContent = `${cc.humidity}%`;
    rainText.textContent = `${cc.precipprob}%`;
}

function updateDOM(data) {
    const cc = data.currentConditions;
    body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),  url(${weatherMap[cc.icon].image})`;
    updateCurrentWeather(data);
    updateNextHoursWeather(data);
    updateNextDaysWeather(data);
    updateCards(data);
}

/**********************/

// await localStorage.setItem('debug', JSON.stringify(await getWeatherData("banana")))
const startData = await getWeatherData("banana");
updateDOM(startData);
