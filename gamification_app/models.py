from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class ScoreBoard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    weekly_score = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
