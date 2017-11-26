import React, { Component } from 'react';
import {getIcon} from '../Helpers.js';
import moment from 'moment-timezone';

class WeatherItem extends Component{

  constructor(){
      super();
      this.state ={
        timezone:[]
      };
  }


  /**
   * Render out WeatherItem Component
   */
  render(){

    const item = this.props.item;

    let datetime = new Date(item.dt * 1000);
    let localetime = "";
    let hour = 0;
    let time = "";

    if(this.props.timezone){
      localetime = moment.tz(datetime, this.props.timezone);
      hour = localetime.format("H");
      time = localetime.calendar();
    }


    //let time = timeConverter(item.dt);
    let prefix = 'wi wi-';
    let code = item.weather[0].id;
    // let item_time = new Date(item.dt * 1000);

    let icon = getIcon(hour, code);

    return (<div className="weather-item">
           <div className={prefix + icon + " icon " + this.props.classes.icon}></div>
           <div className="description">{item.weather[0].description}</div>
           <h2 className="time">{time}</h2>

         </div>)


  }
}

export default WeatherItem;
