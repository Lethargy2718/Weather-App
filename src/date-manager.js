export { getDate, convertTo12HourFormat, getNextDay };

function getDate(weatherData, weekday = "long") {
    const now = new Date();

    const optionsTime = {
        timeZone: weatherData.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    const optionsDay = { timeZone: weatherData.timezone, weekday };
    const optionsHour24 = {
        timeZone: weatherData.timezone,
        hour: "2-digit",
        hour12: false,
    }; // 24-hour format

    return {
        day: new Intl.DateTimeFormat("en-US", optionsDay).format(now),
        time: new Intl.DateTimeFormat("en-US", optionsTime).format(now), // AM/PM format
        hour24: new Intl.DateTimeFormat("en-US", optionsHour24).format(now), // 24-hour format
    };
}

// Example: 7:00:00 => 7:00 AM
function convertTo12HourFormat(time24) {
    const [hours, minutes, seconds] = time24.split(":");
    const date = new Date(0, 0, 0, hours, minutes, seconds);

    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Example: Sunday => Monday
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
