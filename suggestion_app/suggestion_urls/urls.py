from django.urls import path
from suggestion_app.suggestion_urls.views import SuggestionAV

urlpatterns = [
    path('', SuggestionAV.as_view(), name='all-suggested-problems'),
]