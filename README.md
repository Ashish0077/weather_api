# WeatherApp_Backend

It is a Weather API which fetches data from https://openweathermap.org/current#data and saves it a mySQL database and exposes its own endpoints to access that data.

## 3RE Architecture: Router, RouteHandler, ResponseHandler, ErrorHandler

![](github_assets/3RE.png)

## How to build and run this project

* Clone this repository.
* Execute `npm install`
* Make sure MySQL is installed your system.
* Login to MySQL using your root user.
* Execute the following MySQL Queries:
  * `CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`
  * `GRANT ALL PRIVILEGES ON weatherApp.* TO 'username'@'localhost';`
  * `FLUSH PRIVILEGES;`
  * `exit`
* Rename the following files:
  * .env.example --> .env
  * ormconfig.json.example --> ormconfig.json
* Provide `username`, `password` and `database` (weatherApp) info in **ormconfig.json** for typeorm to properly connect to the Database.
* Provide `NODE_ENV` (development/production), `PORT`, `apikey` in **.env** file
* Execute `npm start`.

## Project Directory Structure

```
.
├── src
│   ├── controllers
│   │   ├── access
│   │   │   └── register.ts
│   │   ├── userPreferences
│   │   │   └── userPreferences.ts
│   │   └── weatherData
│   │       └── weather.ts
│   ├── core
│   │   ├── ApiError.ts
│   │   └── ApiResponse.ts
│   ├── database
│   │   ├── model
│   │   │   ├── BaseModel.ts
│   │   │   ├── UserPreferences.ts
│   │   │   ├── User..ts
│   │   │   └── WeatherData.ts
│   │   ├── repository
│   │   │   ├── UserRepo.ts
│   │   │   └── WeatherDataRepo.ts
│   │   └── db.ts
│   ├── routes
│   │   └── routes.ts
│   ├── utils
│   │   ├── asyncHandler.ts
│   │   ├── constants.ts
│   │   ├── errorHandler.ts
│   │   └── helpers.ts
│   ├── app.ts
│   ├── config.ts
│   └── server.ts
├── .env
├── ormconfig.json
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## API Examples

* Register User
    ```
    POST /registerUser
    Host: localhost:3000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
      "name": "Test User",
      "email": "testuser@gmail.com",
      "password": "password",
      "preferences": {
        "city1": "Mumbai"
      }
    }
    ```
    * Success Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "User successfully created.",
      "data": {
        "user": {
          "name": "Test User",
          "email": "testuser@gmail.com",
          "uuid": "d2de1bd5-f3e9-44cf-a346-ac7f079aeac5",
          "createdAt": "2021-05-24T06:17:09.401Z",
          "updatedAt": "2021-05-24T06:17:09.401Z"
        },
        "preferences": {
          "city1": "Mumbai",
          "city2": null,
          "city3": null,
          "uuid": "31c5b8b5-fe8f-4f2f-9efc-98047bbcc01b",
          "createdAt": "2021-05-24T06:17:09.297Z",
          "updatedAt": "2021-05-24T06:17:09.297Z"
        }
      }
    }
    ```

* Update User Prefreferences
    ```
    PATCH /setUserPreferences
    Host: localhost:3000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
      "email": "testuser@gmail.com",
      "city2": "Bangalore",
      "city1": "Delhi",
      "city3": "Kolkata"
    }
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "Successfully updated user preferences."
    }
    ```
* Update weather data
    ```
    POST /updateWeatherData
    Host: localhost:3000
    Content-Type: application/json
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "Successfully updated weather data."
    }
    ```
* Get user weather data
    ```
    GET /userWeatherData?tempUnit=celcius
    Host: localhost:3000
    ```
    * Request Body
    ```json
    {
      "email": "testuser@gmail.com",
    }
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "Success",
      "data": {
        "weatherData": [
          {
            "uuid": "a7bd444b-d80d-49c5-bc21-aa4b72351df0",
            "createdAt": "2021-05-24T05:05:10.730Z",
            "updatedAt": "2021-05-24T06:21:40.000Z",
            "cityName": "Delhi",
            "currTemp": 31.85,
            "minTemp": 31.85,
            "maxTemp": 31.85,
            "clouds": 0,
            "windSpeed": 7,
            "windDeg": 317,
            "windGust": 10,
            "rain1h": null,
            "rain3h": null
          },
          {
            "uuid": "9f94988c-640d-42e6-b616-c93f1372c481",
            "createdAt": "2021-05-24T05:05:10.089Z",
            "updatedAt": "2021-05-24T06:21:39.000Z",
            "cityName": "Bangalore",
            "currTemp": 28.85,
            "minTemp": 27.85,
            "maxTemp": 28.85,
            "clouds": 20,
            "windSpeed": 5,
            "windDeg": 290,
            "windGust": null,
            "rain1h": null,
            "rain3h": null
          },
          {
            "uuid": "e8fc3f36-5cb4-488b-8e53-2d693b2f852a",
            "createdAt": "2021-05-24T05:05:11.111Z",
            "updatedAt": "2021-05-24T06:21:40.000Z",
            "cityName": "Kolkata",
            "currTemp": 29.85,
            "minTemp": 29.85,
            "maxTemp": 29.85,
            "clouds": 75,
            "windSpeed": 4,
            "windDeg": 65,
            "windGust": 5,
            "rain1h": 0,
            "rain3h": null
          }
        ]
      }
    }
    ```
### License

```
MIT License

Copyright (c) 2021 Ashish Arora

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```