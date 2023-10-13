from users.models import User
from rest_framework import status

DEFAULT_TEST_USER = "johndoe@mail.com"
DEFAULT_TEST_PASS = 'secret12345'

def loginWithAPI(client, email=DEFAULT_TEST_USER, password=DEFAULT_TEST_PASS):
    response = client.post('/users/login/',
                           dict(email=email, password=password))
    if response.status_code != status.HTTP_201_CREATED or 'access_token' not in response.data:
        print(response.data)
        raise RuntimeError('Login failed in test. Status code {}'.format(
            response.status_code))
    token = response.data['access_token']
    client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    return token, client


def create_some_user(email=DEFAULT_TEST_USER, password=DEFAULT_TEST_PASS):
    user = User(email=email, username=email)
    user.set_password(password)
    user.save()
    return user
