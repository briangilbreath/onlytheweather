import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'

import Slider from 'react-slick';
import moment from 'moment-timezone';
import ReactGA from 'react-ga';
import '../css/App.css';

import CityForm from '../components/CityForm.js';
import Weather from '../components/Weather.js';
import WeatherItem from '../components/WeatherItem.js';
import Video from '../components/Video.js';
import {assembleParams} from '../Helpers.js';


class App extends Component {
  constructor(){
    super();

    this.api = "http://api.openweathermap.org/data/2.5";
    this.api_key = "c26d5b63c30db5a2d9d6c4b708895eaa";

    this.state = {
        weather_current: [],
        weather_forecast: [],
        weather_city:[],
        weather_timezone: "",
        weather_localetime_h: "",
        weather_localetime_formatted:"",
        classes:{
          icon: "animated fadeInUp",
          current_city: "animated fadeInDown"
        },
        width:"",
        height:""
    };

    this.getForecast = this.getForecast.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.getAllWeather = this.getAllWeather.bind(this);
    this.getTimeZone = this.getTimeZone.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);



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
                icon: "",
                current_city: ""
              }
          })
        }, 3000);

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions);
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
          icon: "animated fadeInUp",
          current_city: "animated fadeInDown"
        }
    });

    //remove after 3 seconds
    setTimeout(() => {
            this.setState({
              classes:{
                icon: "",
                current_city: ""
              }
          })
        }, 3000);
  }


  /**
   * Get Current Weather and Forecast
   */
  getAllWeather(city){
    var data = {};
    data.city = city;

    this.getForecast(data);
    this.getWeather(data);

    ReactGA.event({
        category: 'city',
        action: 'get_weather',
        label: data.city
    });
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

    const params = assembleParams(data.city, this.api_key);
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

  }


  /**
   * Get Weather from API
   */
  getWeather(data){

    const params = assembleParams(data.city, this.api_key);
    const city = this.api + "/weather?" + params;

    fetch(city)
        .then( (response) => {

            return response.json() })
                .then( (json) => {
                    this.setState({
                      weather_current: json
                    });

                    if(json.coord){
                      this.getTimeZone(json.coord.lat, json.coord.lon, json.dt);
                    }


                });

  }

  /**
   * Get Timezone from API
   */
  getTimeZone(lat, long, time){

    fetch('https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+long+'&timestamp='+time+'&sensor=false')
        .then( (response) => {
            return response.json() })
                .then( (json) => {

                let datetime = new Date(time * 1000);
                let localetime = moment.tz(datetime, json.timeZoneId);

                this.setState({
                  weather_timezone: json.timeZoneId,
                  weather_localetime_h: localetime.format('H'),
                  weather_localetime_formatted: localetime.format('LLL z')
                });
              });

  }


  /**
   * Get Window Dimensions
   */
  updateDimensions() {
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    this.setState({width: width, height: height});
  }


  /**
   * Render out Home Component
   */
  render(){

    let settings = {
      arrows:true,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6
    };

    if(this.state.width < 1000 && this.state.width !== ""){
      settings = {
       arrows:false,
       dots: true,
       infinite: false,
       speed: 500,
       slidesToShow: 4,
       slidesToScroll: 4
     };
    }


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
            <Video
              time_h={this.state.weather_localetime_h}
              current={this.state.weather_current}/>
          ) : (
            <div></div>
          )}


          <div className="header">

            <CityForm history={this.props.history} />

            {(this.state.weather_city) ? (
              <div className="current-city">
              <h2 className={this.state.classes.current_city + " city "} >{this.state.weather_city.name}</h2>
              <h4 className={this.state.classes.current_city + " time "} >{this.state.weather_localetime_formatted}</h4>
              </div>
            ):(
              <div></div>
            )}

          </div>

          {Object.keys(this.state.weather_current).length > 0  ? (
            <Weather
              current={this.state.weather_current}
              time_h={this.state.weather_localetime_h}
            />
          ) : (
            <div></div>
          )}

          <div className="list desktop">
            {weather_list.length > 0 ? (
              <Slider {...settings}>
                    {weather_list}
               </Slider>
            ) : (
              <div></div>
            )}
          </div>


        </div>


        <div className="list mobile">
          {weather_list.length > 0 ? (
            <Slider {...settings}>
                  {weather_list}
             </Slider>
          ) : (
            <div></div>
          )}
        </div>

        <p className="footer white">ReactJS App by <a href="http://briangilbreath.com" target="_blank" rel="noopener noreferrer">Brian Gilbreath © 2017</a> - <Link to={`/about`}>About the App</Link></p>



      </div>
    )
  }
}

export default withRouter(App);
