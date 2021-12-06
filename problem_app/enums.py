from django.db import models
from django.utils.translation import gettext_lazy as _


class ParticipationType(models.TextChoices):
    CONTESTANT = "CONTESTANT", _("Contestant")
    PRACTICE = "PRACTICE", _("Practice")
    VIRTUAL = "VIRTUAL", _("Virtual")
    MANAGER = "MANAGER", _("Manager")
    OUT_OF_COMPETITION = "OUT_OF_COMPETITION", _("Out_of_competition")

