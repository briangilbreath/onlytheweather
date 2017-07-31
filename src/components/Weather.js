import React, { Component } from 'react';
import {getIcon} from '../Helpers.js';


class Weather extends Component{

  constructor(){
      super();
      this.state ={
        current:{
          weather:[]
        }
      };
  }

  componentWillUpdate(nextProps,nextState){
    //alert('will update');
  }
  /**
   * Render out Weather Component
   */
  render(){

    const current = this.props.current;
    const hour = this.props.time_h;


    if(current.cod === 429){
      return (<div>{current.message}</div>);
    }


    if(!current.weather){
      return(<div className="middle-screen">No current weather for specified city</div>)
    }

    let prefix = 'wi wi-';
    let code = current.weather[0].id;
    let description = current.weather[0].description;
    let icon = getIcon(hour, code);
    let temp = Math.round(current.main.temp);


    return (<div className="current">
              <div className="weather animated fadeInUp">
                <div className={prefix + icon + " animated fadeInUp"}></div>
                <div className="description">{description}</div>
             </div>
             <div className="temperature animated fadeInUp">{temp}<span>°F</span></div>
          </div>)


  }
}

export default Weather;
