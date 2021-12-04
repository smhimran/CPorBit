from django.db import models
from django.utils.translation import gettext_lazy as _


class SubmissionPrivacy(models.TextChoices):
    PUBLIC = "PUBLIC", _("Public")
    PRIVATE = "PRIVATE", _("Private")
    PROTECTED = "PROTECTED", _("Protected")


class MentorListPrivacy(models.TextChoices):
    PUBLIC = "PUBLIC", _("Public")
    PRIVATE = "PRIVATE", _("Private")
    PROTECTED = "PROTECTED", _("Protected")


class MenteeListPrivacy(models.TextChoices):
    PUBLIC = "PUBLIC", _("Public")
    PRIVATE = "PRIVATE", _("Private")
    PROTECTED = "PROTECTED", _("Protected")


class MentorShipStatus(models.TextChoices):
    REQUESTED_FROM_MENTOR = "REQUESTED_FROM_MENTOR", _("Requested from mentor")
    REQUESTED_FROM_MENTEE = "REQUESTED_FROM_MENTEE", _("Requested from Mentee")
    CURRENT = "CURRENT", _("Current")
    FORMER = "FORMER", _("Former")
