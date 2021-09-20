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
