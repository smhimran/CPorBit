from datetime import datetime
from django.utils.timezone import make_aware

from django.contrib.auth.models import User
from django.db import models
from problem_app.models import Problem


# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default = make_aware(datetime.now()))
    
    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return self.problem.cf_problem_id + ' to ' + self.user.username


class Suggestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default = make_aware(datetime.now()))

    def __str__(self):
        return self.problem.cf_problem_id + ' to ' + self.user.username


class Recommendation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Mentor')
    note = models.CharField(max_length=300, null=True, blank=True)
    timestamp = models.DateTimeField(default = make_aware(datetime.now()))
    
    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return self.problem.cf_problem_id + ' to ' + self.user.username + ' by ' + self.mentor.username



