import { BindBaseController } from './bind-base.controller';

export class WeatherController extends BindBaseController {
  constructor({ weatherService }) {
    super();

    this.weatherService = weatherService;
  }

  async getCurrentWeather(req, res) {
    const currentWeather = await this.weatherService.getCurrentWeather(
      req.params.city,
    );

    res.json(currentWeather);
  }

  async getExtendedWeather(req, res) {
    const extendedWeather = await this.weatherService.getExtendedWeather(
      req.params.city,
    );

    res.json(extendedWeather);
  }
}
