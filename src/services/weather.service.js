import { weatherApi } from '../config';

export class WeatherService {
  #API_KEY = weatherApi.appId;

  constructor({ logger, weatherClient, locationService }) {
    this.logger = logger;
    this.weatherClient = weatherClient;
    this.locationService = locationService;
  }

  async getCurrentWeather(city = '') {
    const {
      coord: { lon, lat },
      name: cityName,
      sys: { country: countryCode },
      ...weather
    } = await this.#getWeatherData('/data/2.5/weather', city);

    return {
      location: {
        lon,
        lat,
        city: cityName,
        countryCode,
      },
      weather: {
        weather: weather.weather.pop(),
        main: weather.main,
        visibility: weather.visibility,
        wind: weather.wind,
        rain: weather.rain,
        clouds: weather.clouds,
      },
    };
  }

  async getExtendedWeather(city = '') {
    const {
      city: {
        coord: { lon, lat },
        name: cityName,
        country: countryCode,
      },
      list,
    } = await this.#getWeatherData('/data/2.5/forecast', city);

    const forecast = this.#getForecastData(list);

    return {
      location: {
        lon,
        lat,
        city: cityName,
        countryCode,
      },
      forecast,
    };
  }

  async #getWeatherData(url, city = '') {
    const params = { appid: this.#API_KEY, units: 'metric' };

    if (city) {
      params['q'] = city;
    } else {
      const location = await this.locationService.find();
      params['lat'] = location.lat;
      params['lon'] = location.lon;
    }
    this.logger.debug({ title: 'weather api params', params });
    const { data } = await this.weatherClient.get(url, {
      params,
    });

    return data;
  }

  #getForecastData(data) {
    const result = {};

    for (const item of data) {
      const date = item.dt_txt.split(' ')[0];
      const weather = {
        weather: item.weather.pop(),
        main: item.main,
        visibility: item.visibility,
        wind: item.wind,
        rain: item.rain,
        clouds: item.clouds,
      };
      if (result[date]) {
        result[date].push(weather);
        continue;
      }
      result[date] = [weather];
    }

    return result;
  }
}
