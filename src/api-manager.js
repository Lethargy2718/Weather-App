export default async function getWeatherData(location, group = "metric") {
    const encodedLocation = encodeURIComponent(location.toLowerCase());
    const key = "Q57UX7R379AUT2YVMZWUQCMV3";
    const query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=${group}&key=${key}&contentType=json&lang=en`;

    try {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error("API Error:", e);
        return null;
    }
}
