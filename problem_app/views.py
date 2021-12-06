from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from user_app.models import User
from user_app.models import Profile
from problem_app.models import AcceptedSubmission
from problem_app.services.updateallsubmission import updateSubmission
from problem_app.serializers.SubmissionSerializer import SubmissionSerializer

import _thread


class SubmissionAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        username = request.GET.get('username')
        
        queryset = []
        if username:
            try:
                usernow = User.objects.get(username=username)
            except Exception as e:
                print(e)
                print('User not found')
                return Response(dict({
                    'status': 'FAILED',
                    'message': 'user not found'
                }))
            queryset = AcceptedSubmission.objects.filter(user=usernow)
        else:
            queryset = AcceptedSubmission.objects.all()
        serializer = SubmissionSerializer(queryset, many = True)
        return Response({
            'status': 'OK',
            'submissions': serializer.data
        })
    

class UpdateSubmissionAV(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        usernow = request.user
        
        try:
            profilenow = Profile.objects.get(user = usernow)
        except:
            return Response({
                'status' : 'FAILED',
                'message': 'profile not found',
            })
        if profilenow.is_updating == True:
            return Response({
                'status' : 'FAILED',
                'message': 'update in progress',
            })
        if not profilenow.cf_handle:
            return Response({
                'status' : 'FAILED',
                'message': 'no codeforces handle found',
            })
        
        _thread.start_new_thread(updateSubmission, (usernow,))
        
        return Response(dict({
            'status' : 'OK',
            'message': 'updating data',
        }))
