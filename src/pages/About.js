import React, { Component } from 'react';

class About extends Component{

  /**
   * Render out Page Component
   */
  render(){

    return (<div>
      <h2>About</h2>
        <div className="credits">
        <p>Weather provided by OpenWeatherAPI</p>
        <p>Location services provided by ip-api.com</p>
        <p>Timezone services provided by Google Maps</p>
        <p>Weather Video provided by Vimeo</p>
        <p>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</p>
        <p>ReactJS App by <a href="http://briangilbreath.com">Brian Gilbreath</a></p>
        </div>
      </div>)

  }
}

export default About;
