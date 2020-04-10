import axios from 'axios';

/*
  url: {
    ios: localhost
    android: {
      android studio: 10.0.2.2,
      genymotion: 10.0.3.2,
      phone via usb: your ip
    }
  }
*/

const api = axios.create({
  baseURL: 'http://192.168.0.14:3334',
});
export default api;
