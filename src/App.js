import axios from "axios";
import React from "react";
import logo from "./logo.png";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      currCity: "",
      currTemp: "",
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: "",
    };
  }

  handleCityChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  handleSubmitCity = (e) => {
    e.preventDefault();
    axios
      .get(`https://restcountries.com/v3.1/name/${this.state.city}`)
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.latlng[0]}&lon=${cityGeoData.latlng[1]}&appid=ec5073fbd637603d26977ea42790dc4a&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;

        this.setState({
          city: "",
          currCity: weatherData.name,
          currTemp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
        });
      });
  };

  render() {
    const weatherInfo = this.state.currCity ? (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
          alt="weather-icon"
        />
        <p>Current Country: {this.state.currCity}</p>
        <p>Current Temperature: {this.state.currTemp}°C</p>
        <p>
          Current Weather: {this.state.weatherType}, {this.state.weatherDesc}
        </p>
      </div>
    ) : (
      <p>Please enter a country name to get its weather data.</p>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmitCity}>
            <input
              type="text"
              placeholder="Enter Country"
              value={this.state.city}
              onChange={this.handleCityChange}
            ></input>
            <input type="submit" value="Check Weather" />
          </form>
          {weatherInfo}
        </header>
      </div>
    );
  }
}

// STEPS
// 1) Make an input
// 2) The input accepts an user input capturing the city
// 3) Capture the information inside state
// 4) Make a button
// 5) When user clicks on button, it will fire off the API requests
// 6) Right now, capturing a city - find an API that takes city name, and spits out Lat/Long
// https://restcountries.com/v3.1/name/{country}
// 7) After we received the country information, we call the weather API with the Lat/Long
// 8) Display the information

export default App;
