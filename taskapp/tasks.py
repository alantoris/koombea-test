"""Celery tasks."""

# Django
from django.conf import settings

# Models
from pages.models import WebPage, LinkScrapped

# Celery
from .celery import app
from .parser import Parser

@app.task(name='scrapper', max_retries=3)
def scrap_web_page(web_page_pk):
    """Start the scrapper."""
    webpage = WebPage.objects.get(pk=web_page_pk)
    webpage.state = WebPage.STATE_IN_PROCESS
    webpage.save()

    parser = Parser(webpage.page)
    try:
        webpage.name = parser.get_title()
        webpage.save()

        links = parser.get_all_links()
        for link in links:
            LinkScrapped.objects.create(
                page=webpage,
                name=link["body"],
                link=link["href"]
            )
        webpage.state = WebPage.STATE_DONE
        webpage.save()
    except Exception as e:
        print(e)
        webpage.state = WebPage.STATE_FAILED
        webpage.save()
        raise Exception("Task failed")

    
