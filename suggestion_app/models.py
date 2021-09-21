from django.contrib.auth.models import User
from django.db import models
from problem_app.models import Problem


# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

    def __str__(self):
        return self.problem.cf_problem_id + ' to ' + self.user.username


class SuggestedProblem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

    def __str__(self):
        return self.problem.cf_problem_id + ' to ' + self.user.username


class MentorSuggestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Mentor')

    def __str__(self):
        return self.problem.cf_problem_id + ' to ' + self.user.username + ' by ' + self.mentor.username



