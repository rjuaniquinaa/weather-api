import { createContainer, asClass, InjectionMode, asValue } from 'awilix';
import axios from 'axios';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import logger from './pino.setup';
import config from './config';

export const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

export const setup = () => {
  container
    //CONTROLLERS
    .register({
      locationController: asClass(LocationController),
    })
    //SERVICES
    .register({
      locationService: asClass(LocationService),
      logger: asValue(logger.logger),
      locationClient: asValue(axios.create({ baseURL: config.ipApiUrl })),
    });
};
