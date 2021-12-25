from rest_framework import serializers

from suggestion_app.models import Favorite
from problem_app.serializers.ProblemSerializer import ProblemListSerializer


class FavoriteSerializer(serializers.ModelSerializer):
    problem = serializers.SerializerMethodField()
    
    class Meta:
        model = Favorite
        fields = ('timestamp', 'problem')
        
    def get_problem(self, object):
        serializer = ProblemListSerializer(object.problem, context={'username': object.user.username})
        return serializer.data