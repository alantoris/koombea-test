from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase

from rest_framework import status
from scraper.utils import create_some_user, loginWithAPI


class PageViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_some_user()
        self.token, self.client = loginWithAPI(self.client)
        self.page = "http://www.google.com"

    def test_create_ok(self):
        response = self.client.post(
            f'/pages/', dict(page=self.page), format='json')

        self.assertEquals(status.HTTP_201_CREATED, response.status_code)
        self.assertEquals(
            sorted([
                'page',
                'name',
            ]), sorted(response.data.keys()))

    def test_list(self):
        response = self.client.get(
            '/pages/',
            format='json')
        self.assertEquals(status.HTTP_200_OK, response.status_code)
        self.assertEquals(
            sorted([
                'count',
                'next',
                'previous',
                'results'
            ]), sorted(response.data.keys()))
