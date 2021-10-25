const submit = document.getElementById("form");
let cityArr = [];
submit.addEventListener("submit", (e) => {
  e.preventDefault();
  let search = document.getElementById("search");
  let weatherCards = document.querySelector(".weather-cards");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${apiKey}&units=metric`;
  if (search.value != "") {
    cityArr.push(search.value);
    if (checkDuplicate(cityArr) == true) {
      cityArr.pop();
      alert("City already added");
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const icon = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
          const city = document.createElement("div");
          city.classList.add("city-cards");
          const weather = `
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <h1>${Math.round(data.main.temp)} °C</h1>
                    <img src=${icon}>
                    <h4>${data.weather[0]["description"]}</h4>
                    <span>Wind Speed : ${data.wind.speed} m/s</span>
                    <span>Humidity : ${data.main.humidity} %</span>
                `;
          city.innerHTML = weather;
          weatherCards.appendChild(city);
        })
        .catch(() => {
          alert("Please enter valid city name");
        });
    }
    search.value = "";
    search.focus();
  } else {
    alert("Please enter a city name");
  }
});
//Checking for duplicate locations
function checkDuplicate(d) {
  return new Set(d).size !== d.length;
}