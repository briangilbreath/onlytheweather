import dayWeatherIcons from './config/day-icon-mapping.json';
import nightWeatherIcons from './config/night-icon-mapping.json';

export function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hours = a.getHours();
    var hour = (hours + 24) % 12 || 12;;
    var ampm = hours >= 12 ? 'pm' : 'am';
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var time = month + ' ' + date + ', ' + year + ' ' + hour + ampm;
    return time;
}

export function getIcon(hour, code){
  if (hour > 6 && hour < 20) {
      //Day time
     var icon = dayWeatherIcons[code].icon;
     icon = "day-" + icon;
     return icon;

  } else {
      //Night time
     var icon = nightWeatherIcons[code].icon;
     icon = "night-" + icon;
     return icon;
  }
}


export function getVideo(hour, code){
  if (hour > 6 && hour < 20) {
      //Day time
     var video = dayWeatherIcons[code].video;
     return video;

  } else {
      //Night time
     var video = nightWeatherIcons[code].video;
     return video;
  }
}
