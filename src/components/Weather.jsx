import React, { useState } from "react";
import styled from "styled-components";
import "./Weather.css";

const api = {
  key: "044f49d8438d82d3d747f975263bcdf8",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (e) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "cold warm"
            : "cold"
          : "cold"
      }
    >
      <main>
        <Div1>
          <input
            type="text"
            className="search-bar"
            placeholder="Search ..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </Div1>
        {typeof weather.main != "undefined" ? (
          <>
            <LocationBox>
              <div className="location">
                {weather.name} ,{weather.sys.country}{" "}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </LocationBox>
            <WeatherBox>
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather"> {weather.weather[0].main}</div>
            </WeatherBox>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Weather;

const Div1 = styled.div`
  width: 100%;
  margin: 0 0 75px;
  .search-bar {
    display: block;
    width: 100%;
    padding: 15px;

    appearance: none;
    background: none;
    border: none;
    outline: none;

    background-color: #ffffff80;
    border-radius: 0px 0px 16px 16px;
    margin-top: -25px;

    box-shadow: 0px 5px #00000033;

    color: #313131;
    font-size: 21px;

    transition: 0.4s ease;
  }
  .search-bar:focus {
    background-color: #ffffffbf;
  }
`;
const LocationBox = styled.div`
  .location {
    color: #fff;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;

    text-shadow: 3px 3px #00000024;
  }
  .date {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 300;
    font-style: italic;
    text-align: center;

    text-shadow: 2px 2px #00000024;
  }
`;

const WeatherBox = styled.div`
  text-align: center;
  .temp {
    color: #070404d7;

    position: relative;
    display: inline-block;
    margin: 30px auto;
    background-color: #ffffff75;
    border-radius: 1rem;

    padding: 15px;
    font-size: 6.3rem;
    font-weight: 600;

    text-shadow: 3px 6px #00000063;
    text-align: center;
    box-shadow: 3px 6px #2a292966;
  }
  .weather {
    color: #fff;
    font-size: 2.3rem;
    font-weight: 700;

    text-shadow: 3px 6px #00000043;
  }
`;
