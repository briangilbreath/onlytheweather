import React, { Component } from 'react';
import {getIcon} from '../Helpers.js';

class Weather extends Component{

  componentWillUpdate(nextProps,nextState){
    //alert('will update');
  }
  /**
   * Render out Weather Component
   */
  render(){

    const current = this.props.current;


    if(current.cod == 429){
      return (<div>{current.message}</div>);
    }

    let item_time = new Date(current.dt * 1000);
    let hour = item_time.getHours();
    let prefix = 'wi wi-';
    let code = current.weather[0].id;
    let description = current.weather[0].description;
    let icon = getIcon(hour, code);
    let temp = Math.round(current.main.temp);

    return (<div className="current">
              <div className="weather">
                <div className={prefix + icon}></div>
                <div className="description">{description}</div>
             </div>
             <div className="temperature">{temp}°F</div>
          </div>)


  }
}

export default Weather;
