export class LocationService {
  constructor({ logger, locationClient }) {
    this.logger = logger;
    this.locationClient = locationClient;
  }

  async find(ipAddress = '') {
    const url = `/${ipAddress}?fields=countryCode,city,lat,lon`;

    const { data } = await this.locationClient.get(url);

    return data;
  }
}
