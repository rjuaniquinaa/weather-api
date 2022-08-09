import { weatherApi } from '../config';

export class WeatherService {
  #API_KEY = weatherApi.appId;

  constructor({ logger, weatherClient, locationService }) {
    this.logger = logger;
    this.weatherClient = weatherClient;
    this.locationService = locationService;
  }

  async getCurrentWeather(city = '') {
    const params = { appid: this.#API_KEY, units: 'metric' };

    if (city) {
      params['q'] = city;
    } else {
      const location = await this.locationService.find();
      params['lat'] = location.lat;
      params['lon'] = location.lon;
    }

    const {
      data: {
        coord: { lon, lat },
        name: cityName,
        sys: { country: countryCode },
        ...weather
      },
    } = await this.weatherClient.get('/data/2.5/weather', {
      params,
    });

    return {
      location: {
        lon,
        lat,
        city: cityName,
        countryCode,
      },
      weather: {
        ...weather.weather.pop(),
        main: weather.main,
        visibility: weather.visibility,
        wind: weather.wind,
        rain: weather.rain,
        clouds: weather.clouds,
      },
    };
  }
}
