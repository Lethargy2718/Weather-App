import "./style.css";

async function getWeatherData(key, location, group = "metric") {
    location = location.toLowerCase().replaceAll(" ", "%20");
    // const key = "Q57UX7R379AUT2YVMZWUQCMV3";
    const query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${group}&key=${key}&contentType=json&lang=en`;

    try {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

// const weatherData = await getWeatherData(key, "new york");
// localStorage.setItem("debug", JSON.stringify(weatherData));

const data = JSON.parse(localStorage.getItem("debug"));
console.log(data);

function getDate(weatherData, type = "long") {
    const localDate = new Date(
        new Date().getTime() + weatherData.tzoffset * 60 * 60 * 1000,
    );
    const dayName = new Intl.DateTimeFormat("en-US", { weekday: type }).format(
        localDate,
    );
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const time = new Intl.DateTimeFormat("en-US", timeOptions).format(
        localDate,
    );
    return { dayName, time };
}

function getNextDay(currentDay) {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const index = days.findIndex((day) => day === currentDay);
    if (index === -1) throw new Error(currentDay + " is not a valid day.");
    return days[(index + 1) % 7];
}
