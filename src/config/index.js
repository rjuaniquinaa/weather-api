const { PORT, APP_ID } = process.env;

export default {
  port: PORT || 3000,
  // ipApiUrl: 'https://ipapi.co',
  ipApiUrl: 'http://ip-api.com/json',
  // openWeatherUrl: 'https://api.openweathermap.org',
};

export const weatherApi = {
  url: 'https://api.openweathermap.org',
  appId: APP_ID,
};
