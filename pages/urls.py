"""Pages URLs."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import WebPageViewSet, LinkScrappedViewSet

router = DefaultRouter()
router.register(r'pages', WebPageViewSet, basename='pages')
router.register(r'links', LinkScrappedViewSet, basename='links')

urlpatterns = [
    path('', include(router.urls))
]
