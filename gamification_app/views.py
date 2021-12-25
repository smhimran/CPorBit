from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.filters import SearchFilter
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from gamification_app.models import ScoreBoard
from gamification_app.paginations.StandingsPagination import \
    StandingsPagination
from gamification_app.serializers.ScoreBoardSerializer import \
    ProfileScoreSerializer
from gamification_app.serializers.StandingsSerializer import \
    StandingsProfileSerializer


# Create your views here.
class StandingsViewset(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().filter(is_active=True).order_by('-scoreboard__score')
    serializer_class = StandingsProfileSerializer
    pagination_class = StandingsPagination
    filter_backends = (SearchFilter,)
    search_fields = ('username', 'first_name', 'last_name', 'profile__university', 'profile__cf_handle')


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_user_score(request):
    username = request.GET.get('username')
    scores = []
    if username:
        user = User.objects.get(username=username)
        scores = ScoreBoard.objects.filter(user=user)
        return Response(ProfileScoreSerializer(scores[0]).data, status=200)
    elif request.user.is_authenticated:
        scores = ScoreBoard.objects.filter(user=request.user)
        return Response(ProfileScoreSerializer(scores[0]).data, status=200)
    else:
        return Response({'message': 'Bad  Request!'}, status=400)
        
