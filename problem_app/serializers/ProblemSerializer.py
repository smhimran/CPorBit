from rest_framework import serializers

from user_app.models import (User)
from problem_app.models import (Problem, AcceptedSubmission)
from suggestion_app.models import (Favorite, SuggestedProblem, MentorSuggestion)


class ProblemListSerializer(serializers.ModelSerializer):
    total_solved = serializers.SerializerMethodField()
    is_solved = serializers.SerializerMethodField()
    tag = serializers.SerializerMethodField()
    
    class Meta:
        model = Problem
        fields = ('cf_problem_id', 'cf_problem_name', 'is_solved', 'score', 'total_solved', 'tag')
    
    def get_is_solved(self, object):
        problem = Problem.objects.get(cf_problem_id = object.cf_problem_id)
        user = User.objects.get(username = self.context.get('username'))
        return AcceptedSubmission.objects.filter(problem = problem, user = user).exists()
    
    def get_total_solved(self, object):
        problem = Problem.objects.get(cf_problem_id = object.cf_problem_id)
        return AcceptedSubmission.objects.filter(problem=problem).count()
    
    def get_tag(self, object):
        tags = list()
        for i in object.tag.all():
            tags.append(i.name)
        return tags
        
        
class ProblemSerializer(serializers.ModelSerializer):
    is_favourite = serializers.SerializerMethodField()
    is_suggested = serializers.SerializerMethodField()
    is_mentor_recommended = serializers.SerializerMethodField()
    is_solved = serializers.SerializerMethodField()
    total_solved = serializers.SerializerMethodField()
    tag = serializers.SerializerMethodField()
    
    class Meta:
        model = Problem
        fields = ('cf_problem_id', 'cf_problem_name', 'cf_contest_id', 'cf_problem_index', 'is_favourite', 'is_suggested', 'is_mentor_recommended', 'is_solved', 'score', 'total_solved', 'tag')
        
    def get_is_favourite(self, object):
        problem = Problem.objects.get(cf_problem_id = object.cf_problem_id)
        user = User.objects.get(username = self.context.get('username'))
        return Favorite.objects.filter(user = user, problem = problem).exists()
    
    def get_is_suggested(self, object):
        problem = Problem.objects.get(cf_problem_id = object.cf_problem_id)
        user = User.objects.get(username = self.context.get('username'))
        return SuggestedProblem.objects.filter(user = user, problem = problem).exists()
    
    def get_is_mentor_recommended(self, object):
        problem = Problem.objects.get(cf_problem_id = object.cf_problem_id)
        user = User.objects.get(username = self.context.get('username'))
        return MentorSuggestion.objects.filter(user = user, problem = problem).exists()
    
    def get_is_solved(self, object):
        problem = Problem.objects.get(cf_problem_id = object.cf_problem_id)
        user = User.objects.get(username = self.context.get('username'))
        return AcceptedSubmission.objects.filter(problem = problem, user = user).exists()
    
    def get_total_solved(self, object):
        problem = Problem.objects.get(cf_problem_id = object.cf_problem_id)
        return AcceptedSubmission.objects.filter(problem=problem).count()
    
    def get_tag(self, object):
        tags = list()
        for i in object.tag.all():
            tags.append(i.name)
        return tags