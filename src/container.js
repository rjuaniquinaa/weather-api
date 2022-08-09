import { createContainer, asClass, InjectionMode, asValue } from 'awilix';
import axios from 'axios';
import { LocationController } from './controllers/location.controller';
import { WeatherController } from './controllers/weather.controller';
import { LocationService } from './services/location.service';
import { WeatherService } from './services/weather.service';
import logger from './pino.setup';
import config, { weatherApi } from './config';

export const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

export const setup = () => {
  container
    //CONTROLLERS
    .register({
      locationController: asClass(LocationController),
      weatherController: asClass(WeatherController),
    })
    //SERVICES
    .register({
      locationService: asClass(LocationService),
      weatherService: asClass(WeatherService),
      logger: asValue(logger.logger),
      locationClient: asValue(axios.create({ baseURL: config.ipApiUrl })),
      weatherClient: asValue(axios.create({ baseURL: weatherApi.url })),
    });
};
