"""Celery tasks."""

# Django
from django.conf import settings

# Models
from pages.models import WebPage

# Celery
from .celery import app

@app.task(name='scrapper', max_retries=3)
def scrap_web_page(web_page_pk):
    """Start the scrapper."""
    webpage = WebPage.objects.get(pk=web_page_pk)
    print("SCRAPPER DUMMY PRINT")
    print(webpage)
