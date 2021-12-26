from datetime import datetime

from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import make_aware

from problem_app.enums import ParticipationType


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    

class Problem(models.Model):
    tag = models.ManyToManyField(Tag)
    cf_problem_id = models.CharField(max_length=20, unique=True)
    cf_problem_index = models.CharField(max_length=20, null=True)
    cf_contest_id = models.IntegerField(default=0, null=True)
    cf_problem_name = models.CharField(max_length=100, null=True)
    score = models.IntegerField(default=0)
    timestamp_updated = models.DateTimeField(default = make_aware(datetime.now()))

    def __str__(self):
        return self.cf_problem_id
    

class AcceptedSubmission(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cf_submission_id = models.IntegerField(default=0, unique=True)
    timestamp = models.DateTimeField(default = make_aware(datetime.now()))
    participantType = models.CharField(max_length=20, choices=ParticipationType.choices, default=ParticipationType.PRACTICE)
    current_rating = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return self.problem.cf_problem_id + ' by ' + self.user.username
    