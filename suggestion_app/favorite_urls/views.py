from datetime import datetime

from django.utils.timezone import make_aware
from problem_app.models import Problem
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from suggestion_app.models import Favorite
from suggestion_app.serializers.FavoriteSerializer import FavoriteSerializer


class FavoriteAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        usernow = request.user
        limit = request.GET.get('limit')
        try:
            queryset = []
            if limit is None:
                queryset = Favorite.objects.filter(user=usernow)
            else:
                queryset = Favorite.objects.filter(user=usernow)[:int(limit)]
        except Exception as e:
            print(e)
            return Response({
                'status': 'FAILED',
                'problems': "Error in database query",
            }, status=500)
        
        serializer = FavoriteSerializer(queryset, many=True)
        return Response({
            'status': 'OK',
            'favorits': serializer.data,
        })
        
        
    def post(self, request):
        usernow = request.user
        problemid = request.data.get('cf_problem_id')
            
        try:
            problemnow = Problem.objects.get(cf_problem_id = problemid)
        except Exception as e:
            print(e)
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem not found',
            }, status=404)
            
        if Favorite.objects.filter(user = usernow, problem = problemnow).exists():
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem already exists',
            })
            
        if Favorite.objects.filter(user = usernow).count() > 99:
            return Response({
                'status' : 'FAILED',
                'message' : 'Limit Reached, delete some favorites to add new favorite',
            })
        
        newfav = Favorite(
            user = usernow,
            problem = problemnow,
            timestamp = make_aware(datetime.now())
        )
        newfav.save()
        
        return Response({
            'status': 'OK',
            'message': 'the problem ' + problemid + ' added favorite for ' + usernow.username,
        })
        
        
    def delete(self, request):
        usernow = request.user
        problemid = request.data.get('cf_problem_id')
            
        try:
            favnow = Favorite.objects.get(user = usernow, problem__cf_problem_id = problemid)
        except Exception as e:
            print(e)
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem not found',
            }, status=404)
        
        favnow.delete()
        
        return Response({
            'status': 'OK',
            'message': 'the problem ' + problemid + ' removed from favorite for ' + usernow.username,
        })
