import React, { Component } from 'react';
import {getVideo} from '../Helpers.js';

class Video extends Component{

  componentWillUpdate(nextProps,nextState){
    //alert('will update');
  }
  /**
   * Render out Video Component
   */

   componentDidMount(){
    //  let video = document.getElementById("weather-video");
    //  video.autoplay = true;
    //  video.load();
   }

  render(){

    const current = this.props.current;
    const hour = this.props.time_h;

    let item_time = new Date(current.dt * 1000);
    //let hour = item_time.getHours();
    let code = current.weather[0].id;
    let video_file = getVideo(hour, code);
    let src = '//player.vimeo.com/video/' + video_file + '?title=0&amp;portrait=0&amp;byline=0&amp;autoplay=1&amp;loop=1&amp;background=1"';


    return (<div className="video-player">
      <div className='embed-container'>
        <iframe src={src}></iframe>
      </div>
    </div>)


  }
}

export default Video;
