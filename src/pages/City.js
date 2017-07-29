import React, { Component } from 'react';

class Home extends Component{

  /**
   * Render out City Component
   */
  render(){

    return (<div>City: {this.props.match.params.id}</div>)

  }
}

export default Home;
