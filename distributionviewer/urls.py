from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

from .api.views import distributions, metrics


urlpatterns = [
    url(r'^distributions/$', distributions, name='distributions'),
    url(r'^metrics/$', metrics, name='metrics'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'.*', TemplateView.as_view(
        template_name='distributionviewer/index.html'), name='index')
]
