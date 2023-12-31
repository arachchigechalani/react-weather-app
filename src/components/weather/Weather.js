import { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  let today = new Date();
  let date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    "(" +
    weekday[today.getDay()] +
    ")";

  const [input, setInput] = useState(""); /* initial state */
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [dateToday, setDateToday] = useState(date);

  const api = {
    url: "http://api.openweathermap.org/data/2.5/",
    key: "d8ff1eaa2a5259cf272986f027e73aae",
  };
  const iconURL = "http://openweathermap.org/img/w/";

  const getInput = (e) => {
    /* Arrow function to get the input */
    setInput(e.target.value);
  };

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be empty");
      setError(true);
    }
    if (e.key === "Enter" && input !== "") {
      /* /weather?q={CITY_NAME}&appid={API_KEY} */
      /*  console.log("check"); */
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&   
            &appid=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to fetch Data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
          setIsLoading(false);
        });
    }
  };

  /* const handleSearch = () => {
    getWeatherData(input);
  } */


  return (
    <section className="--100vh --center-all">
      <div className="container weather --flex-center">
        <div className="weather-app">
          <h1>Weather App</h1>
          <p>{dateToday}</p>
          <div className="--form-control --my2">
            <input
              className="inputSearch"
              type="text"
              placeholder="Search City Name"
              onChange={getInput}
              value={input}
              onKeyPress={getWeatherData}
            />
            <button className="btnSearch" type="button"
            /* onClick={handleSearch} */
            >Search
            </button>
          </div>
          {error ? (
            <p className="">
              {errorMsg != "" ? "error " : " "}
              {errorMsg}
            </p>
          ) : (
            <div className="result --card my2">
              <div className="today">
                <h2>
                  {weather.name},{weather.sys.country}
                </h2>
                <div className="icon">
                  <img
                    src={iconURL + weather.weather[0].icon + ".png"}
                    alt={weather.weather[0].main}
                  />
                </div>
                <p className="t1">
                  Temp: {Math.round(weather.main.temp - 273.15)}°C
                </p>
                <p className="t2">Weather: {weather.weather[0].main}</p>
                {/* <p className="t3">Temp Range: {Math.round((weather.main.temp_min)- 273.15)}
            °C / {Math.round((weather.main.temp_max)- 273.15)}°C</p> */}
              </div>




            </div>
          )}
          {isLoading && <h3>Loading...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Weather;
