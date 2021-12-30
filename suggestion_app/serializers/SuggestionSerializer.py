from rest_framework import serializers

from suggestion_app.models import Suggestion
from problem_app.serializers.ProblemSerializer import ProblemListSerializer


class SuggestionSerializer(serializers.ModelSerializer):
    problem = serializers.SerializerMethodField()
    
    class Meta:
        model = Suggestion
        fields = ('timestamp', 'problem')
        
    def get_problem(self, object):
        serializer = ProblemListSerializer(object.problem, context={'username': object.user.username})
        return serializer.data