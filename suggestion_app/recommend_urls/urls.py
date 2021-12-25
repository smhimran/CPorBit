from django.urls import path
from suggestion_app.recommend_urls.views import (RecommendationAV, RecommendAV)

urlpatterns = [
    path('', RecommendationAV.as_view(), name='all-recomendation-problems'),
    path('<username>/', RecommendAV.as_view(), name='recomend-problems'),
]