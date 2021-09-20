from django.contrib.auth.models import User
from django.db import models
from django.db.models.base import Model

from user_app.enums import (MenteeListPrivacy, MentorListPrivacy,
                            SubmissionPrivacy)


# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)
    cf_handle = models.CharField(max_length=150)
    university = models.CharField(max_length=300, null=True, blank=True)
    submission_privacy = models.CharField(max_length=20, choices=SubmissionPrivacy.choices, default=SubmissionPrivacy.PRIVATE)
    mentor_list_privacy = models.CharField(max_length=20, choices=MentorListPrivacy.choices, default=MentorListPrivacy.PRIVATE)
    mentee_list_privacy = models.CharField(max_length=20, choices=MenteeListPrivacy.choices, default=MenteeListPrivacy.PRIVATE)

    class Meta:
        db_table = 'auth_user_profile'

        constraints = [
            models.CheckConstraint(
                check=models.Q(
                    submission_privacy__in=SubmissionPrivacy.values
                ),
                name="%(app_label)s_%(class)s_submission_privacy_check_cons",
            ),

            models.CheckConstraint(
                check=models.Q(
                    mentor_list_privacy__in=MentorListPrivacy.values
                ),
                name="%(app_label)s_%(class)s_mentor_list_privacy_check_cons",
            ),

            models.CheckConstraint(
                check=models.Q(
                    mentee_list_privacy__in=MenteeListPrivacy.values
                ),
                name="%(app_label)s_%(class)s_mentee_list_privacy_check_cons",
            ),
        ]

    def __str__(self):
        return self.user.username


class Mentee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Mentee')
    is_current = models.BooleanField()

    def __str__(self):
        return self.mentee.username + ' is a mentee of ' + self.user.username


class MentorshipRequest(models.Model):
    request_user = models.ForeignKey(User, on_delete=models.CASCADE)
    target_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Target_user')
    request_type = models.CharField(max_length=50)

    def __str__(self):
        return self.request_user.username + ' to ' + self.target_user.username

