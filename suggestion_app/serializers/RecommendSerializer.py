from rest_framework import serializers

from suggestion_app.models import Recommendation
from problem_app.serializers.ProblemSerializer import ProblemListSerializer


class RecommendationSerializer(serializers.ModelSerializer):
    problem = serializers.SerializerMethodField()
    mentor = serializers.SerializerMethodField()
    
    class Meta:
        model = Recommendation
        fields = ('timestamp', 'mentor', 'note', 'problem')
        
    def get_problem(self, object):
        serializer = ProblemListSerializer(object.problem, context={'username': object.user.username})
        return serializer.data
    
    def get_mentor(self, object):
        return object.mentor.username