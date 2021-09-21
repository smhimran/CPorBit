from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name
    

class Problem(models.Model):
    tag = models.ManyToManyField(Tag)
    score = models.IntegerField(default=0)
    cf_problem_id = models.CharField(max_length=100)

    def __str__(self):
        return self.cf_problem_id
    

class ProblemStatistic(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    newbie = models.IntegerField(default=0)
    pupil = models.IntegerField(default=0)
    specialist = models.IntegerField(default=0)
    expert = models.IntegerField(default=0)
    candidate_master = models.IntegerField(default=0)
    master = models.IntegerField(default=0)
    international_master = models.IntegerField(default=0)
    grandmaster = models.IntegerField(default=0)
    international_grandmaster = models.IntegerField(default=0)
    legendary_grandmaster = models.IntegerField(default=0)

    def __str__(self):
        return self.problem.cf_problem_id


class AcceptedSubmission(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField()

    def __str__(self):
        return self.problem.cf_problem_id + ' by ' + self.user.username
    