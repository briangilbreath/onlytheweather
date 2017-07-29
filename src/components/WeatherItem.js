import React, { Component } from 'react';
import {timeConverter, getIcon} from '../Helpers.js';

class WeatherItem extends Component{



  /**
   * Render out WeatherItem Component
   */
  render(){

    const item = this.props.item;
    console.log(item);

    let time = timeConverter(item.dt);
    let prefix = 'wi wi-';
    let code = item.weather[0].id;
    let item_time = new Date(item.dt * 1000);
    let hour = item_time.getHours();
    let icon = getIcon(hour, code);

    return (<div className={prefix + icon}>
           <h2>{time}</h2>
           {item.weather[0].description}
         </div>)


  }
}

export default WeatherItem;
