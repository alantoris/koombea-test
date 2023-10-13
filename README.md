# koombea-test
Solution for python test of the koombea selection process


## Instructions 

To execute this test it is enough to simply build the docker images generated using the docker compose file

`docker-compose build`

After its completion we will simply launch the django backend containers, the database and the tools for asynchronous tasks (celery, redis)

`docker-compose up`

After these steps we will have the backend available in our local environment on port 8000


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