from problem_app.models import AcceptedSubmission, Problem
from rest_framework import serializers
from user_app.models import Profile, User


class SubmissionSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    cf_username = serializers.SerializerMethodField()
    cf_problem_id = serializers.SerializerMethodField()
    cf_problem_name = serializers.SerializerMethodField()
    
    class Meta:
        model = AcceptedSubmission
        fields = ('user', 'cf_username', 'cf_submission_id', 'cf_problem_id', 'cf_problem_name', 'participantType', 'timestamp')
        
    def get_user(self, object):
        res = User.objects.get(username=object.user).username
        return res
        
    def get_cf_username(self, object):
        res = Profile.objects.get(user=object.user).cf_handle
        return res
    
    def get_cf_problem_id(self, object):
        res = Problem.objects.get(cf_problem_id=object.problem.cf_problem_id).cf_problem_id
        return res
    
    def get_cf_problem_name(self, object):
        res = Problem.objects.get(cf_problem_id=object.problem.cf_problem_id).cf_problem_name
        return res
