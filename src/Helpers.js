import dayWeatherIcons from './config/day-icon-mapping.json';
import nightWeatherIcons from './config/night-icon-mapping.json';


function encodeQueryData(data) {
   let ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}


export function assembleParams(city, id, country){
  var data = {
    'q': city+','+country,
    'appid': id,
    'units': 'imperial'
  };
  var querystring = encodeQueryData(data);
  return querystring;
}


export function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hours = a.getHours();
    var hour = (hours + 24) % 12 || 12;;
    var ampm = hours >= 12 ? 'pm' : 'am';
    var time = month + ' ' + date + ', ' + year + ' ' + hour + ampm;
    return time;
}

export function getIcon(hour, code){
  var icon;
  if (hour > 6 && hour < 20) {
      //Day time
     icon = dayWeatherIcons[code].icon;
     icon = "day-" + icon;
     return icon;

  } else {
      //Night time
     icon = nightWeatherIcons[code].icon;
     icon = "night-" + icon;
     return icon;
  }
}


export function getVideo(hour, code){
  var video;
  if (hour > 6 && hour < 20) {
      //Day time
     video = dayWeatherIcons[code].video;
     return video;

  } else {
      //Night time
     video = nightWeatherIcons[code].video;
     return video;
  }
}
