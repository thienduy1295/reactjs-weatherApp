import React, { useEffect, useState } from "react";
import "./App.css";
const api = {
  key: "0bb32dda7acee5fed45f157308312549",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Goi Api
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  //Handle button Search
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <div className="card">
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button>
            <svg
              stroke="currentColor"
              fill="currentColor"
              // stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
          </button>
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {errorMessage ? (
              <div className="errorMessage">{errorMessage}</div>
            ) : (
              <>
                {typeof weatherInfo.main != "undefined" ? (
                  <div className="weather">
                    <h2 className="city">
                      Weather in {weatherInfo.name}, {weatherInfo.sys.country}
                    </h2>
                    <h1 className="temp">{weatherInfo.main.temp}°C</h1>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`}
                      alt=""
                      className="icon"
                    />
                    <div className="description">
                      {weatherInfo.weather[0].main}
                    </div>
                    <div className="humidity">
                      Humidity: {weatherInfo.main.humidity}%
                    </div>
                    <div className="wind">
                      Wind speed: {weatherInfo.wind.speed} km/h
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
