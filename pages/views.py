""" Pages views"""

# Django REST Framework
from rest_framework import mixins, viewsets

# Serializers
from .serializers import WebPageModelSerializer, LinkScrappedModelSerializer

# Models 
from .models import WebPage, LinkScrapped

class WebPageViewSet(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """
    A simple ViewSet for viewing web pages.
    """
    queryset = WebPage.objects.all()
    serializer_class = WebPageModelSerializer

    def get_serializer_class(self):
        return self.serializer_class

    def get_queryset(self):
        queryset = WebPage.objects.filter(scrapped_by=self.request.user)
        return queryset


class LinkScrappedViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing links scrapped.
    """
    queryset = LinkScrapped.objects.all()
    serializer_class = LinkScrappedModelSerializer
