import React, { Component } from 'react';
import {getVideo} from '../Helpers.js';

class Video extends Component{

  constructor(){
      super();
      this.state ={
        current:{
          weather:[]
        }
      };
  }

  /**
   * Render out Video Component
   */


  render(){

    const current = this.props.current;
    const hour = this.props.time_h;

    if(!current.weather){
      return(<div></div>)
    }

    //let hour = item_time.getHours();
    let code = current.weather[0].id;
    let video_file = getVideo(hour, code);
    let src = '<iframe id="iframe-player" src="//player.vimeo.com/video/' + video_file + '?title=0&amp;portrait=0&amp;byline=0&amp;autoplay=1&amp;loop=1&amp;background=1"></iframe>';

    return (<div className="video-player">
      <div className='embed-container' >
        <div dangerouslySetInnerHTML={{__html: src}} />
      </div>
    </div>)


  }
}

export default Video;
