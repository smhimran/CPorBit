from problem_app.models import AcceptedSubmission
from rest_framework import serializers

from user_app.models import (User, Profile)
from problem_app.models import Problem


class SubmissionSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    cf_username = serializers.SerializerMethodField()
    cf_contest_id = serializers.SerializerMethodField()
    cf_problem_index = serializers.SerializerMethodField()
    
    class Meta:
        model = AcceptedSubmission
        exclude = ['id', 'problem', 'user', 'current_rating']
        
    def get_username(self, object):
        res = User.objects.get(username=object.user).username
        return res
        
    def get_cf_username(self, object):
        res = Profile.objects.get(user=object.user).cf_handle
        return res
    
    def get_cf_contest_id(self, object):
        res = Problem.objects.get(cf_problem_id=object.problem).cf_contest_id
        return res
    
    def get_cf_problem_index(self, object):
        res = Problem.objects.get(cf_problem_id=object.problem).cf_problem_index
        return res