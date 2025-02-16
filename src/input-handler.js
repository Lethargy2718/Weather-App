import getWeatherData from "./api-manager";
import { updateDOM } from "./dom-manager";

const searchContainer = document.querySelector(".search-container");
const inputEl = document.querySelector(".location-search");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", async () => {
    const location = inputEl.value;
    if (!location) return;
    searchContainer.classList.remove("invalid");
    const data = await getWeatherData(location);

    if (!data) {
        searchContainer.classList.add("invalid");
        return;
    }

    updateDOM(data);
});
