export class LocationService {
  #RESPONSE_FORMAT = '/json';

  constructor({ logger, locationClient }) {
    this.logger = logger;
    this.locationClient = locationClient;
  }

  async find(ipAddress = '') {
    const url = ipAddress
      ? `/${ipAddress}${this.#RESPONSE_FORMAT}`
      : this.#RESPONSE_FORMAT;

    const { data } = await this.locationClient.get(url);

    return data;
  }
}
