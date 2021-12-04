from django.contrib.auth.models import User
from django.db import models

from notification_app.enums import NotificationTypes


# Create your models here.
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=50, choices=NotificationTypes.choices, default=NotificationTypes.OTHER)
    is_read = models.BooleanField(default=False)

    class Meta:
        db_table = 'notification'

        constraints = [
            models.CheckConstraint(
                check=models.Q(
                    notification_type__in=NotificationTypes.values
                ),
                name="%(app_label)s_%(class)s_notification_type_check_cons",
            ),

        ]

    def __str__(self):
        return self.user.username + " " + self.notification_type
