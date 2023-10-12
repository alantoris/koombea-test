from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ErrorDetail
from rest_framework.test import APIClient
from django.test import TestCase

from rest_framework import status
from users.models import User


def loginWithAPI(client, email, password):
    response = client.post('/users/login/',
                           dict(email=email, password=password))
    if response.status_code != status.HTTP_201_CREATED or 'access_token' not in response.data:
        print(response.data)
        raise RuntimeError('Login failed in test. Status code {}'.format(
            response.status_code))
    token = response.data['access_token']
    client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    return token


def create_some_user(email="johndoe@mail.com", password='secret12345'):
    user = User(email=email, username=email)
    user.set_password(password)
    user.save()
    return user


class NoAuthUserViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.password = 'wCU9qdoPqe'
        self.user = create_some_user(password=self.password)

    def test_create_ok(self):
        response = self.client.post(
            '/users/signup/', 
            dict(
                email="johndoe2@mail.com", 
                password="tY0RyuHIj1",
                password_confirmation="tY0RyuHIj1",
            ),
            format='json')
        self.assertEquals(status.HTTP_201_CREATED, response.status_code)
        self.assertEquals(
            sorted([
                'email',
            ]), sorted(response.data.keys()))
    
    def test_create_short_password(self):
        response = self.client.post(
            '/users/signup/', 
            dict(
                email="jhondoe@mail.com", 
                password="short",
                password_confirmation="short",
            ),
            format='json')
        self.assertEquals(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEquals(
            {
                'password': [ErrorDetail(string='Ensure this field has at least 8 characters.', code='min_length')], 
                'password_confirmation': [ErrorDetail(string='Ensure this field has at least 8 characters.', code='min_length')]
            }, response.data)
    
    def test_login_ok(self):
        response = self.client.post(
            '/users/login/', 
            dict(email=self.user.email, password=self.password),
            format='json')
        self.assertEquals(status.HTTP_201_CREATED, response.status_code)
        self.assertEquals(
            sorted([
                'user',
                'access_token',
            ]), sorted(response.data.keys()))
    
    def test_login_fail(self):
        response = self.client.post(
            '/users/login/', 
            {
                "email": self.user.email,
                "password": 'INCORRECT'
            },
            format='json')
        self.assertEquals(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEquals({"non_field_errors": ["Invalid credentials"]}, response.data)


