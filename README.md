# koombea-test
Solution for python test of the koombea selection process


## Instructions 

To execute this test it is enough to simply build the docker images generated using the docker compose file

`docker-compose build`

After its completion we will simply launch the django backend containers, the database and the tools for asynchronous tasks (celery, redis)

`docker-compose up`

After these steps we will have the backend available in our local environment on port 8000

In order to build the frontend, you must move into the `koombea-front` folder, 
install the necessary packages and then build the react application with the following commands

`npm install`
`npm start`

The react application must be run on port 3000 of your localhost.
If you already have this port in use and the application starts on another, you can change the backend configuration to accept requests from another frontend 
in `scraper/setting.py ` line 171 `CORS_ALLOWED_ORIGINS`, adding the port as necessary.

Likewise, if your backend is served on a port other than 8000, you should configure the `src/api/config.js` file 
before setting up the frontend and modify the `API_URL` variable so that it matches your host and port.


## Consideraciones

The system has an email and password record, although the statement only said username and password. 
Then in the next point it requests that the login be via email and password, 
so it was decided to unify one criterion and use email and password for both actions.

The frontend is not using cookies, so a reload to the website will cause the session to be lost.

The system does not have information reloading, some websites may take a while to process and the frontend will not update the information automatically. 
An easy way to have new information will be to navigate between the pages of the tables so that new information is requested.

## Development tips

```bash

Build:
docker-compose build

Up:
docker-compose  up

Up with django in a secondary console
docker-compose ps
docker rm -f <django_container_name>
docker-compose run --rm --service-ports django


Comandos administrativos
docker-compose run --rm django COMMAND

docker-compose run --rm django python manage.py shell  <--- Django console
docker-compose run --rm django python manage.py test  <--- Test execution
docker-compose run --rm django coverage manage.py test  <--- Test execution with coverage
docker-compose run --rm django coverage report <---> Test results
```


# Tools used 

Visual Studio Code
Postman
Google Chromes