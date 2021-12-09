from django.db import models
from django.utils.translation import gettext_lazy as _


class MentorShipStatus(models.TextChoices):
    REQUESTED_FROM_MENTOR = "REQUESTED_FROM_MENTOR", _("Requested from mentor")
    REQUESTED_FROM_MENTEE = "REQUESTED_FROM_MENTEE", _("Requested from Mentee")
    CURRENT = "CURRENT", _("Current")
    FORMER = "FORMER", _("Former")
