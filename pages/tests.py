from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase

from rest_framework import status
from .models import WebPage, LinkScrapped
from scraper.utils import create_some_user, loginWithAPI

def create_page(page, user):
    wp = WebPage.objects.create(
        page=page,
        name="",
        scrapped_by=user
    )
    return wp

def create_links(page, name="default", link="wwww.default.com"):
    link = LinkScrapped.objects.create(
        page=page,
        name=name,
        link=link
    )
    return link


class PageViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_some_user()
        self.token, self.client = loginWithAPI(self.client)
        self.page = "http://www.google.com"
        self.created_page = create_page(self.page, self.user)

    def test_create_ok(self):
        response = self.client.post(
            f'/pages/', dict(page=self.page), format='json')

        self.assertEquals(status.HTTP_201_CREATED, response.status_code)
        self.assertEquals(
            sorted([
                'id',
                'page',
                'name',
                'links',
                'state'
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
        self.assertEquals(
            sorted([
                'id',
                'page',
                'name',
                'state',
                'links',
            ]), sorted(response.data["results"][0].keys()))


class LinksViewSetTest(PageViewSetTest):
    def setUp(self):
        super().setUp()
        create_links(self.created_page)

    def test_list(self):
        response = self.client.get(
            f'/links/{self.created_page.pk}/',
            format='json')
        self.assertEquals(status.HTTP_200_OK, response.status_code)
        self.assertEquals(
            sorted([
                'count',
                'next',
                'previous',
                'results'
            ]), sorted(response.data.keys()))
        self.assertEquals(
            sorted([
                'id',
                'page',
                'name',
                'link',
            ]), sorted(response.data["results"][0].keys()))
