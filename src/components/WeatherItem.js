import React, { Component } from 'react';
import {timeConverter, getIcon} from '../Helpers.js';
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
      time = localetime.format("LLL z")
    }


    console.log(localetime);


    //let time = timeConverter(item.dt);
    let prefix = 'wi wi-';
    let code = item.weather[0].id;
    let item_time = new Date(item.dt * 1000);

    let icon = getIcon(hour, code);

    return (<div>
           <div className={prefix + icon + " icon " + this.props.classes.icon}></div>
           <h2>{time}</h2>
           {item.weather[0].description}
         </div>)


  }
}

export default WeatherItem;
