import logging
logger = logging.getLogger('django')

from datetime import datetime

from django.utils.timezone import make_aware
from problem_app.models import AcceptedSubmission, Problem
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from suggestion_app.models import Recommendation
from suggestion_app.serializers.RecommendSerializer import \
    RecommendationSerializer
from user_app.models import Mentee, User


class RecommendationAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            usernow = request.user
            limit = request.GET.get('limit')

            queryset = []
            try:
                cnt = int(limit)
                queryset = Recommendation.objects.filter(user=usernow)[:cnt]
            except Exception as ex:
                logger.exception(ex)
                queryset = Recommendation.objects.filter(user=usernow)
                
            serializers = RecommendationSerializer(queryset, many=True)
            
            return Response({
                'status': 'OK',
                'recommendations': serializers.data,
            })
        except Exception as ex:
            logger.exception(ex)
            return Response({
                'status': 'FAILED',
                'message': 'Error ocurred while getting recomendations.',
            }, status=500)
        
    def delete(self, request):
        try:
            usernow = request.user
            problemid = request.data.get('cf_problem_id')
            
            if problemid is None:
                return Response({
                    'status' : 'FAILED',
                    'message' : 'No problem selected'
                }, status=400)
                
            try:
                recnow = Recommendation.objects.get(user = usernow, problem__cf_problem_id = problemid)
            except Exception as e:
                logger.exception(ex)
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Problem not recommended',
                }, status=404)
            
            if AcceptedSubmission.objects.filter(user = usernow, problem = recnow.problem).exists():
                recnow.delete()        
                return Response({
                    'status': 'OK',
                    'message': 'the problem ' + problemid + ' removed from recommendation for ' + usernow.username,
                })
                
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem not solved',
            }, status=400)
        except Exception as ex:
            logger.exception(ex)
            return Response({
                'status' : 'FAILED',
                'message' : 'Error ocurred while deleting recomentation.',
            }, status=404)


        
class RecommendAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, username):
        try:
            mentor = request.user
            
            try:
                mentee = User.objects.get(username=username)
            except Exception as ex:
                logger.exception(ex)
                return Response({
                    'status': 'FAILED',
                    'message' : 'Mentee Not Found',
                }, status=404)
            
            if Mentee.objects.filter(mentor=mentor, mentee=mentee, status="CURRENT").exists() == False:
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Not current Mentor'
                }, status=403)
            
            limit = request.GET.get('limit')
            
            queryset = []
            try:
                cnt = int(limit)
                queryset = Recommendation.objects.filter(user=mentee)[:cnt]
            except Exception as ex:
                logger.exception(ex)
                queryset = Recommendation.objects.filter(user=mentee)
                    
            serializers = RecommendationSerializer(queryset, many=True)
            
            return Response({
                'status': 'OK',
                'recommendations': serializers.data,
            })
        except Exception as ex:
            logger.exception(ex)
            return Response({
                'status' : 'FAILED',
                'message' : 'Error ocurred while getting recommendations.'
            }, status=500)
        
    
    def post(self, request, username):
        try:
            mentor = request.user
            
            try:
                mentee = User.objects.get(username=username)
            except Exception as ex:
                logger.exception(ex)
                return Response({
                    'status': 'FAILED',
                    'message' : 'Mentee Not Found',
                })
            
            if Mentee.objects.filter(mentor=mentor, mentee=mentee, status="CURRENT").exists() == False:
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Not current Mentor'
                }, status=403)
                
            problemid = request.data.get('cf_problem_id')
            note = request.data.get('note')
            
            if problemid is None:
                return Response({
                    'status' : 'FAILED',
                    'message' : 'No problem selected'
                }, status=400)
                
            try:
                probnow = Problem.objects.get(cf_problem_id = problemid)
            except Exception as ex:
                logger.exception(ex)
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Problem not found',
                }, status=404)
                
            if Recommendation.objects.filter(user = mentee, problem = probnow).exists():
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Problem Already Recommended',
                }, status=400)
                
            if Recommendation.objects.filter(user = mentee).count() > 99:
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Limit Reached, delete some recommendations to add new recommendations',
                }, status=400)
            
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
        except Exception as ex:
            logger.exception(ex)
            return Response({
                'status' : 'FAILED',
                'message' : 'Error ocurred while recommending problem.'
            }, status=500)
    
        
    def delete(self, request, username):
        try:
            mentor = request.user
            
            try:
                mentee = User.objects.get(username=username)
            except Exception as e:
                print(e)
                return Response({
                    'status': 'FAILED',
                    'message' : 'Mentee Not Found',
                }, status=404)
            
            if Mentee.objects.filter(mentor=mentor, mentee=mentee, status="CURRENT").exists() == False:
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Not current Mentor'
                }, status=403)
                
            problemid = request.data.get('cf_problem_id')
            
            if problemid is None:
                return Response({
                    'status' : 'FAILED',
                    'message' : 'No problem selected'
                }, status=400)
                
            try:
                recnow = Recommendation.objects.get(user = mentee, problem__cf_problem_id = problemid)
            except Exception as e:
                print(e)
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Problem not found',
                }, status=404)
                
            recnow.delete()
            
            return Response({
                'status' : 'OK',
                'message' : 'Problem ' + problemid + ' is removed from recommendations of ' + mentee.username,
            })
        except Exception as ex:
            logger.exception(ex)
            return Response({
                'status' : 'FAILED',
                'message' : 'Error ocurred while deleting recommendation.'
            }, status=500)
        