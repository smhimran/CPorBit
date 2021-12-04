from django.db import models
from django.utils.translation import gettext_lazy as _


class NotificationTypes(models.TextChoices):
    UPDATE = "Submission Update", _("Submission Update")
    REGENERATE = "Suggestion Regenerate", _("Suggestion Regenerate")
    REQUEST = "Connection Request", _("Connection Request")
    ACCEPTED = "Request Accepted", _("Request Accepted")
    REJECTED = "Request Rejected", _("Request Rejected")
    ANNOUNCEMENT = "Announcement", _("Announcement")
    OTHER = "Other", _("Other")
