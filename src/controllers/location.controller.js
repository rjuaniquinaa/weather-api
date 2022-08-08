import { BindBaseController } from './bind-base.controller';

export class LocationController extends BindBaseController {
  constructor({ locationService }) {
    super();

    this.locationService = locationService;
  }

  async get(req, res) {
    res.json(await this.locationService.find());
  }
}
