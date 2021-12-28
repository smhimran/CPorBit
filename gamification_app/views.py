from re import sub

from django.contrib.auth.models import User
from problem_app.models import AcceptedSubmission, Tag
from rest_framework import viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.filters import SearchFilter
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from suggestion_app.services.UserStrengthServices import getUserStrengthsOnTags

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
def get_user_score(request,username):
    try:
        user = User.objects.get(username=username)
        scores = ScoreBoard.objects.filter(user=user)
        return Response(ProfileScoreSerializer(scores[0]).data, status=200)
    
    except User.DoesNotExist:
        return Response({'message': 'User not found'} ,status=404)
    

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_user_stats(request, username):
    try:
        user = User.objects.get(username=username)
        submissions = AcceptedSubmission.objects.filter(user=user)
        
        data = {}
        total = submissions.count()
        for submission in submissions:
            for tag in submission.problem.tag.all():
                if tag.name in data:
                    data[tag.name] += 1
                else:
                    data[tag.name] = 1

        ret = {}
        tags = {}

        ret["total"] = total

        for key, value in data.items():
            item = {}
            per = round(value/total*100, 2)
            item["count"] = value
            item["percentage"] = per
            tags[key] = item

        ret["tags"] = tags

        return Response(ret, status=200)
    
    except User.DoesNotExist:
        return Response({'message': 'User not found'} ,status=404)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_user_strength(request, username):
    try:
        user = User.objects.get(username=username)
        strengths = getUserStrengthsOnTags(user)

        return Response(strengths[:5], status=200)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_user_weakness(request, username):
    try:
        user = User.objects.get(username=username)
        weaknesses = getUserStrengthsOnTags(user)

        return Response(weaknesses[-5:], status=200)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_hardest_problem_solved(request, username):
    try:
        user = User.objects.get(username=username)
        submissions = AcceptedSubmission.objects.filter(user=user)
        submissions = submissions.order_by('-problem__score')

        problem = {
            "cf_id": submissions[0].problem.cf_problem_id,
            "name": submissions[0].problem.cf_problem_name,
            "score": submissions[0].problem.score,
            "tags": [tag.name for tag in submissions[0].problem.tag.all()]
        }

        return Response(problem, status=200)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)
