import { WeatherService } from '../src/services/weather.service';
import { LocationService } from '../src/services/location.service';
import logger from './../src/pino.setup';

describe('WeatherService', () => {
  const weatherClient = { get: jest.fn() };
  const locationClient = { get: jest.fn() };
  const locationService = new LocationService({
    logger: logger.logger,
    locationClient,
  });
  const service = new WeatherService({
    logger: logger.logger,
    weatherClient,
    locationService,
  });

  describe('getCurrentWeather', () => {
    it('returns current weather with location city', async () => {
      const city = 'Buenos aires';
      const weatherMock = {
        data: {
          coord: { lon: -54, lat: -35 },
          name: city,
          sys: { country: 'AR' },
          main: { temp: 13 },
          weather: [{}],
        },
      };

      weatherClient.get.mockResolvedValueOnce(weatherMock);
      const { location, weather } = await service.getCurrentWeather(city);
      expect(location).toMatchObject({
        lon: weatherMock.data.coord.lon,
        lat: weatherMock.data.coord.lat,
        city: weatherMock.data.name,
        countryCode: weatherMock.data.sys.country,
      });
      expect(weather).toMatchObject({
        main: weatherMock.data.main,
        weather: {},
      });
    });

    it('returns error with invalid city', async () => {
      const city = 'INVALID CITY';

      weatherClient.get.mockRejectedValueOnce(new Error());

      await expect(service.getCurrentWeather(city)).rejects.toThrow(Error);
    });

    it('returns current weather without location city', async () => {
      const weatherMock = {
        data: {
          coord: { lon: -54, lat: -35 },
          name: 'mendoza',
          sys: { country: 'AR' },
          main: { temp: 13 },
          weather: [{}],
        },
      };

      jest
        .spyOn(locationService, 'find')
        .mockResolvedValueOnce(weatherMock.data.coord);
      weatherClient.get.mockResolvedValueOnce(weatherMock);
      const { location, weather } = await service.getCurrentWeather();
      expect(location).toMatchObject({
        lon: expect.any(Number),
        lat: expect.any(Number),
        city: expect.any(String),
        countryCode: weatherMock.data.sys.country,
      });
      expect(weather).toMatchObject({
        main: weatherMock.data.main,
        weather: {},
      });
    });
  });
});
