from datetime import datetime
from django.utils.timezone import make_aware

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from suggestion_app.models import Recommendation
from problem_app.models import (AcceptedSubmission, Problem)
from user_app.models import (Mentee, User)
from suggestion_app.serializers.RecommendSerializer import RecommendationSerializer


class RecommendationAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        usernow = request.user
        limit = request.GET.get('limit')

        queryset = []
        try:
            cnt = int(limit)
            queryset = Recommendation.objects.filter(user=usernow)[:cnt]
        except Exception as e:
            queryset = Recommendation.objects.filter(user=usernow)
            
        serializers = RecommendationSerializer(queryset, many=True)
        
        return Response({
            'status': 'OK',
            'recommendations': serializers.data,
        })
    
        
    def delete(self, request):
        usernow = request.user
        problemid = request.data.get('cf_problem_id')
        
        if problemid is None:
            return Response({
                'status' : 'FAILED',
                'message' : 'No problem selected'
            })
            
        try:
            recnow = Recommendation.objects.get(user = usernow, problem__cf_problem_id = problemid)
        except Exception as e:
            print(e)
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem not recommended',
            })
        
        if AcceptedSubmission.objects.filter(user = usernow, problem = recnow.problem).exists():
            recnow.delete()        
            return Response({
                'status': 'OK',
                'message': 'the problem ' + problemid + ' removed from recommendation for ' + usernow.username,
            })
            
        return Response({
            'status' : 'FAILED',
            'message' : 'Problem not solved',
        })


        
class RecommendAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, username):
        mentor = request.user
        
        try:
            mentee = User.objects.get(username=username)
        except Exception as e:
            print(e)
            return Response({
                'status': 'FAILED',
                'message' : 'Mentee Not Found',
            })
        
        if Mentee.objects.filter(mentor=mentor, mentee=mentee, status="CURRENT").exists() == False:
            return Response({
                'status' : 'FAILED',
                'message' : 'Not current Mentor'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        limit = request.GET.get('limit')
        
        queryset = []
        try:
            cnt = int(limit)
            queryset = Recommendation.objects.filter(user=mentee)[:cnt]
        except:
            queryset = Recommendation.objects.filter(user=mentee)
                
        serializers = RecommendationSerializer(queryset, many=True)
        
        return Response({
            'status': 'OK',
            'recommendations': serializers.data,
        })
        
    
    def post(self, request, username):
        mentor = request.user
        
        try:
            mentee = User.objects.get(username=username)
        except Exception as e:
            print(e)
            return Response({
                'status': 'FAILED',
                'message' : 'Mentee Not Found',
            })
        
        if Mentee.objects.filter(mentor=mentor, mentee=mentee, status="CURRENT").exists() == False:
            return Response({
                'status' : 'FAILED',
                'message' : 'Not current Mentor'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
        problemid = request.data.get('cf_problem_id')
        note = request.data.get('note')
        
        if problemid is None:
            return Response({
                'status' : 'FAILED',
                'message' : 'No problem selected'
            })
            
        try:
            probnow = Problem.objects.get(cf_problem_id = problemid)
        except Exception as e:
            print(e)
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem not found',
            })
            
        if Recommendation.objects.filter(user = mentee, problem = probnow).exists():
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem Already Recommended',
            })
            
        if Recommendation.objects.filter(user = mentee).count() > 99:
            return Response({
                'status' : 'FAILED',
                'message' : 'Limit Reached, delete some recommendations to add new recommendations',
            })
        
        recnow = Recommendation(
            user = mentee,
            problem = probnow,
            mentor = mentor,
            note = note,
            timestamp = make_aware(datetime.now()),
        )
        recnow.save()
            
        return Response({
            'status' : 'OK',
            'message' : 'Poblem ' + problemid + ' Recommeded to ' + mentee.username,
        })
    
        
    def delete(self, request, username):
        mentor = request.user
        
        try:
            mentee = User.objects.get(username=username)
        except Exception as e:
            print(e)
            return Response({
                'status': 'FAILED',
                'message' : 'Mentee Not Found',
            })
        
        if Mentee.objects.filter(mentor=mentor, mentee=mentee, status="CURRENT").exists() == False:
            return Response({
                'status' : 'FAILED',
                'message' : 'Not current Mentor'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
        problemid = request.data.get('cf_problem_id')
        
        if problemid is None:
            return Response({
                'status' : 'FAILED',
                'message' : 'No problem selected'
            })
            
        try:
            recnow = Recommendation.objects.get(user = mentee, problem__cf_problem_id = problemid)
        except Exception as e:
            print(e)
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem not found',
            })
            
        recnow.delete()
        
        return Response({
            'status' : 'OK',
            'message' : 'Problem ' + problemid + ' is removed from recommendations of ' + mentee.username,
        })
        