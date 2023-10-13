# Django REST Framework
from rest_framework import serializers

# Models
from .models import WebPage, LinkScrapped

# Serializers
from users.serializers import UserModelSerializer

# Celery app
from taskapp.tasks import scrap_web_page

class WebPageModelSerializer(serializers.ModelSerializer):

    scrapped_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        """Meta class."""
        model = WebPage
        fields = ('page','name','scrapped_by',)
    
    def create(self, validated_data):
        """Handle web page creation and starts the scrapper."""
        web_page = WebPage.objects.create(**validated_data)
        scrap_web_page.delay(web_page_pk=web_page.pk)
        return web_page


class LinkScrappedModelSerializer(serializers.ModelSerializer):

    class Meta:
        """Meta class."""
        model = LinkScrapped
        fields = "__all__"
