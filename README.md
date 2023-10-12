# koombea-test
Solution for python test of the koombea selection process

## Development

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