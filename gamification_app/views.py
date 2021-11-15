from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from gamification_app.paginations.StandingsPagination import \
    StandingsPagination
from gamification_app.serializers.StandingsSerializer import \
    StandingsProfileSerializer


# Create your views here.
class StandingsViewset(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by('-scoreboard__score')
    serializer_class = StandingsProfileSerializer
    pagination_class = StandingsPagination
    filter_backends = (SearchFilter,)
    search_fields = ('username', 'first_name', 'last_name', 'profile__university', 'profile__cf_handle')
