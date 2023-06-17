import logging
logger = logging.getLogger('django')

from rest_framework import serializers

from user_app.models import (User)
from problem_app.models import (Problem, AcceptedSubmission)
from suggestion_app.models import (Favorite, Suggestion, Recommendation)


class ProblemListSerializer(serializers.ModelSerializer):
    total_solved = serializers.SerializerMethodField()
    is_solved = serializers.SerializerMethodField()
    tag = serializers.SerializerMethodField()
    
    class Meta:
        model = Problem
        fields = ('cf_problem_id', 'cf_problem_name', 'is_solved', 'score', 'total_solved', 'tag')
    
    def get_is_solved(self, object):
        try:
            user = User.objects.get(username = self.context.get('username'))
        except Exception as ex:
            logger.exception(ex)
            return False
        return AcceptedSubmission.objects.filter(problem = object, user = user).exists()
    
    def get_total_solved(self, object):
        try:
            problem = Problem.objects.get(cf_problem_id = object.cf_problem_id)
        except Exception as ex:
            logger.exception(ex)
            return 0
        return AcceptedSubmission.objects.filter(problem=problem).count()
    
    def get_tag(self, object):
        tags = list()
        for i in object.tag.all():
            tags.append(i.name)
        return tags
        
        
class ProblemSerializer(serializers.ModelSerializer):
    is_favourite = serializers.SerializerMethodField()
    is_suggested = serializers.SerializerMethodField()
    is_recommended = serializers.SerializerMethodField()
    problem = serializers.SerializerMethodField()
    
    class Meta:
        model = Problem
        fields = ('problem', 'cf_contest_id', 'cf_problem_index' ,'is_favourite', 'is_suggested', 'is_recommended')
        
    def get_problem(self, object):
        serializers = ProblemListSerializer(object, context={'username': self.context.get('username')})
        return serializers.data
        
    def get_is_favourite(self, object):
        try:
            user = User.objects.get(username = self.context.get('username'))
        except Exception as ex:
            logger.exception(ex)
            return False
        return Favorite.objects.filter(user = user, problem = object).exists()
    
    def get_is_suggested(self, object):
        user = User.objects.get(username = self.context.get('username'))
        return Suggestion.objects.filter(user = user, problem = object).exists()
    
    def get_is_recommended(self, object):
        try:
            user = User.objects.get(username = self.context.get('username'))
        except Exception as ex:
            logger.exception(ex)
            return False
        return Recommendation.objects.filter(user = user, problem = object).exists()