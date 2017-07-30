import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Slider from 'react-slick';
import moment from 'moment-timezone';
import '../css/App.css';

import Weather from '../components/Weather.js';
import WeatherItem from '../components/WeatherItem.js';
import Video from '../components/Video.js';
import {assembleParams} from '../Helpers.js';


class App extends Component {
  constructor(){
    super();

    this.api = "http://api.openweathermap.org/data/2.5";
    this.api_key = "c26d5b63c30db5a2d9d6c4b708895eaa";
    this.api_country = "";

    this.state = {
        weather_current: [],
        weather_forecast: [],
        weather_city:[],
        weather_timezone: "",
        weather_localetime_h: "",
        weather_localetime_formatted:"",
        classes:{
          icon: "animated fadeInUp"
        }
    };

    this.getForecast = this.getForecast.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.getAllWeather = this.getAllWeather.bind(this);
    this.getTimeZone = this.getTimeZone.bind(this);

  };


  componentDidMount() {
    //initial mount
    let data = {}

    if(this.props.match.params.id){
      let city = this.props.match.params.id;
      //get weather
      this.getAllWeather(city);
    }else{
      //default city if no parameters
      data.city = this.getLocation(this.getAllWeather);
    }

    //once component is loaded, remove classes after 3 second animation
    setTimeout(() => {
            this.setState({
              classes:{
                icon: ""
              }
          })
        }, 3000);

  }


  componentWillReceiveProps(newProps){
    //back forward button

    //these should pull from some sort of app cache to avoid more calls...
    if(newProps.match.params.id){
      let city = newProps.match.params.id;
      //get weather
      this.getAllWeather(city);
    }else{
      //default city if no new props (aka homepage)
      this.getLocation(this.getAllWeather);
    }

    //add classes back
    this.setState({
        classes:{
          icon: "animated fadeInUp"
        }
    });

    //remove after 3 seconds
    setTimeout(() => {
            this.setState({
              classes:{
                icon: ""
              }
          })
        }, 3000);
  }


  /**
   * Get Current Weather and Forecast
   */
  getAllWeather(city){
    var data = {};

    console.log(city, 'passed city');
    data.city = city;

    this.getForecast(data);
    this.getWeather(data);
  }


  /**
   * Get Users Location from API (for intial load with no city)
   */
  getLocation(callback){

    fetch('http://ip-api.com/json')
        .then( (response) => {
            return response.json() })
                .then( (json) => {
                  //console.log(json.city, "city");
                  callback(json.city);
                });
  }

  /**
   * Get Forecast from API
   */
  getForecast(data, type){

    const params = assembleParams(data.city, this.api_key, this.api_country);
    const city = this.api + "/forecast?" + params;

    fetch(city)
        .then( (response) => {
            return response.json() })
                .then( (json) => {
                  //console.log(json);
                    this.setState({
                      weather_forecast: json.list,
                      weather_city: json.city
                    });
                });

    //clear form
    this.cityForm.reset();
  }


  /**
   * Get Weather from API
   */
  getWeather(data){

    const params = assembleParams(data.city, this.api_key, this.api_country);
    const city = this.api + "/weather?" + params;

    fetch(city)
        .then( (response) => {

            return response.json() })
                .then( (json) => {
                  console.log(json, "current");
                    this.setState({
                      weather_current: json
                    });

                    if(json.coord){
                      this.getTimeZone(json.coord.lat, json.coord.lon, json.dt);
                    }


                });

    //clear form
    this.cityForm.reset();
  }

  /**
   * Get Timezone from API
   */
  getTimeZone(lat, long, time){

    fetch('https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+long+'&timestamp='+time+'&sensor=false')
        .then( (response) => {
            return response.json() })
                .then( (json) => {
                  //console.log(json.timeZoneId, "timezone");

                let datetime = new Date(time * 1000);
                let localetime = moment.tz(datetime, json.timeZoneId);
                console.log(localetime.format('LLL'));

                this.setState({
                  weather_timezone: json.timeZoneId,
                  weather_localetime_h: localetime.format('H'),
                  weather_localetime_formatted: localetime.format('LLL z')
                });
              });

  }

  /**
   * Update weather on form submit
   */
  updateWeather(event, { history }){
    event.preventDefault();

    //get city input from form
    const data = {
      city: this.city.value
    }

    //animate icons
    this.setState({
      classes:{
        icon: "animated fadeInUp"
      }
    })

    //change route on form submit
    if(data.city){
      this.props.history.push(`/city/${data.city}`);
    }

    //clear form
    this.cityForm.reset();
  }


  /**
   * Render out Home Component
   */
  render(){

    const settings = {
     arrows:true,
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 6,
     slidesToScroll: 6
   };

   let weather_list = [];

   if (this.state.weather_forecast) {
      weather_list = this.state.weather_forecast.map((item, i) => {
       return  (<div key={"key-"+i}><WeatherItem classes={this.state.classes} item={item} timezone={this.state.weather_timezone}/></div>)
     });
   }

   return(
      <div>
        <div className="featured">

          {Object.keys(this.state.weather_current).length > 0  ? (
            <Video time_h={this.state.weather_localetime_h} current={this.state.weather_current}/>
          ) : (
            <div></div>
          )}


          <div className="header">

            <form ref={(input) => this.cityForm = input} className="city-edit" onSubmit={this.updateWeather.bind(this)}>
              <input className="input" ref={(input) => this.city = input} type="text" placeholder="City" />
              <button className="button" type="submit">Get Weather</button>
            </form>

            {(this.state.weather_city) ? (
              <div className="current-city">
              <h2 className="city">{this.state.weather_city.name}</h2>
              <h4 className="time">{this.state.weather_localetime_formatted}</h4>
              </div>
            ):(
              <div></div>
            )}

          </div>

          {Object.keys(this.state.weather_current).length > 0  ? (
            <Weather current={this.state.weather_current} />
          ) : (
            <div></div>
          )}

          <div className="list">
            {weather_list.length > 0 ? (
              <Slider {...settings}>
                    {weather_list}
               </Slider>
            ) : (
              <div></div>
            )}
          </div>

        </div>


        <div className="credits">
        <p>Weather provided by OpenWeatherAPI</p>
        <p>Location services provided by ip-api.com</p>
        <p>Timezone services provided by Google Maps</p>
        <p>Weather Video provided by Vimeo</p>
        <p>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</p>
        <p>ReactJS App by <a href="http://briangilbreath.com">Brian Gilbreath</a></p>
        </div>

      </div>
    )
  }
}

export default withRouter(App);
