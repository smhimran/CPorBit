from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from user_app.models import User
from user_app.models import Profile
from problem_app.models import (Problem, AcceptedSubmission)
from problem_app.services.updateallsubmission import updateSubmission
from problem_app.serializers.SubmissionSerializer import SubmissionSerializer

import _thread


class SubmissionAV(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        username = request.GET.get('user')
        problemid = request.GET.get('problem')
        limit = request.GET.get('limit')
        
        queryset = []
        if username and problemid:
            try:
                cnt = int(limit)
                queryset = AcceptedSubmission.objects.filter(user__username = username, problem__cf_problem_id = problemid)[:cnt]
            except:
                queryset = AcceptedSubmission.objects.filter(user__username = username, problem__cf_problem_id = problemid)
        elif username:
            try:
                cnt = int(limit)
                queryset = AcceptedSubmission.objects.filter(user__username=username)[:cnt]
            except:
                queryset = AcceptedSubmission.objects.filter(user__username=username)
        elif problemid:
            try:
                cnt = int(limit)
                queryset = AcceptedSubmission.objects.filter(problem__cf_problem_id = problemid)[:cnt]
            except:
                queryset = AcceptedSubmission.objects.filter(problem__cf_problem_id = problemid)
        else:
            try:
                cnt = int(limit)
                queryset = AcceptedSubmission.objects.all()[:cnt]
            except:
                queryset = AcceptedSubmission.objects.all()
            
        serializer = SubmissionSerializer(queryset, many = True)
        
        return Response({
            'status': 'OK',
            'count': len(serializer.data),
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
            'message': 'updating submissions',
        }))