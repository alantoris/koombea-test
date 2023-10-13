from django.db import models
from users.models import User

class WebPage(models.Model):
    """WebPage model.

    Model to save all the pages sent to the scrapper related to a user
    """

    STATE_OPTIONS = (
        ("INIT", "Initial"),
        ("STARTED", "Started"),
        ("IN_PROCESS", "In process"),
        ("DONE", "Done"),
        ("FAILED", "Failed"),
    )
    page = models.CharField(max_length=128)
    name = models.CharField(max_length=128, null=True)
    scrapped_by = models.ForeignKey(User, on_delete=models.CASCADE)
    state = models.CharField(max_length=16, choices=STATE_OPTIONS, default="INIT")

    def __str__(self):
        return f'{self.page}'


class LinkScrapped(models.Model):
    """WebPage model.

    Model to save the links found by the scrapper when analyzing a WebPage
    """
    page = models.ForeignKey(WebPage, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    link = models.CharField(max_length=128)

    def __str__(self):
        return f'{self.link} ({self.page.name})'