import React, { Component } from 'react';

class CityForm extends Component{

  constructor(){
      super();

      this.state = {
          value:""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

  }


    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();

      //get city input from form
      const data = {
        city: this.state.value
      }

      //change route on form submit
      if(data.city){
        this.props.history.push(`/city/${data.city}`);

        //animate icons
        this.setState({
          classes:{
            icon: "animated fadeInUp"
          },
          value:""
        })
      }
  }


  /**
   * Render out City Form Component
   */

  render(){

    return (<div>
      <form className="city-edit" onSubmit={this.handleSubmit}>
        <input className="input" value={this.state.value} onChange={this.handleChange} type="text" placeholder="City" />
        <button className="button" type="submit">Get Weather</button>
      </form>

    </div>)

  }
}

export default CityForm;
