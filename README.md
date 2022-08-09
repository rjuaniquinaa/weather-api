# Project Name: Weather API
### Requirements
You must have installed docker and docker-compose in local machine

#### Clone and setup 'weather-api' repo
https://github.com/rjuaniquinaa/weather-api

copy `.env.example` file to `.env`
> Note: Edit values as needed

Note: You need an appId of openWeatherMap

##### Start containers
Generate the containers if they not exist and leave the services started.
```sh
docker-compose up -d
```

##### Stop containers
Stop the containers
```sh
docker-compose stop
```

##### Container Logs
```sh
docker-compose logs -f --tail 100 {SERVICE_NAME}
```

##### Local endpoints
```sh
GET http://localhost:3001/v1/current/:city
GET http://localhost:3001/v1/forecast/:city

Note: city is optional

GET http://localhost:3001/v1/location
```
