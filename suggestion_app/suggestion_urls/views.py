import logging
logger = logging.getLogger('django')

import _thread

from problem_app.models import AcceptedSubmission
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from suggestion_app.models import Suggestion
from suggestion_app.serializers.SuggestionSerializer import \
    SuggestionSerializer
from suggestion_app.services.generateSuggestion import generate_new_suggestion
from user_app.models import Profile


class SuggestionAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            usernow = request.user
            limit = request.GET.get('limit')
            
            try:
                profilenow = Profile.objects.get(user = usernow)
            except Exception as ex:
                logger.exception(ex)
                return Response({
                    'status': 'FAILED',
                    'message': 'Profile not found',
                }, status=404)
            if profilenow.is_updating:
                return Response({
                    'status': 'FAILED',
                    'message': 'Updating Suggestion',
                }, status=400)

            queryset = []
            try:
                cnt = int(limit)
                queryset = Suggestion.objects.filter(user=usernow)[:cnt]
            except Exception as e:
                logger.exception(ex)
                queryset = Suggestion.objects.filter(user=usernow)
                
            serializers = SuggestionSerializer(queryset, many=True)
            
            return Response({
                'status': 'OK',
                'count': len(serializers.data),
                'suggetions': serializers.data,
            })
        except Exception as ex:
            logger.exception(ex)
            return Response({
                'status': 'FAILED',
                'message': 'Error ocurred while getting suggestion.',
            }, status=500)
        
        
    def post(self, request):
        try:
            usernow = request.user
            
            try:
                profilenow = Profile.objects.get(user=usernow)
            except Exception as ex:
                logger.exception(ex)
                return Response({
                    'status': 'FAILED',
                    'message': 'Profile not found',
                }, status=404)
                
            if profilenow.is_updating:
                return Response({
                    'status': 'FAILED',
                    'message': 'Update in progress',
                }, status=403)
                
            _thread.start_new_thread(generate_new_suggestion, (usernow,))
                
            return Response({
                'status': 'OK',
                'message': 'Genereting Suggestions',
            })
        except Exception as ex:
            logger.exception(ex)
            return Response({
                'status': 'FAILED',
                'message': 'Error ocurred while generating suggestion.',
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
                suggestnow = Suggestion.objects.get(user = usernow, problem__cf_problem_id = problemid)
            except Exception as e:
                logger.exception(ex)
                return Response({
                    'status' : 'FAILED',
                    'message' : 'Problem not Suggested',
                }, status=400)
            
            if AcceptedSubmission.objects.filter(user = usernow, problem = suggestnow.problem).exists():
                suggestnow.delete()        
                return Response({
                    'status': 'OK',
                    'message': 'the problem ' + problemid + ' removed from Suggestion for ' + usernow.username,
                })
                
            return Response({
                'status' : 'FAILED',
                'message' : 'Problem not solved',
            }, status=403)
        except Exception as ex:
            logger.exception(ex)
            return Response({
                'status' : 'FAILED',
                'message' : 'Error ocurred while deleting suggestion.',
            }, status=400)


        
