# Generated by Django 3.2.7 on 2021-12-14 14:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notification_type', models.CharField(choices=[('Submission Update', 'Submission Update'), ('Suggestion Regenerate', 'Suggestion Regenerate'), ('Connection Request', 'Connection Request'), ('Request Accepted', 'Request Accepted'), ('Request Rejected', 'Request Rejected'), ('Announcement', 'Announcement'), ('Other', 'Other')], default='Other', max_length=50)),
                ('is_read', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'notification',
            },
        ),
        migrations.AddConstraint(
            model_name='notification',
            constraint=models.CheckConstraint(check=models.Q(('notification_type__in', ['Submission Update', 'Suggestion Regenerate', 'Connection Request', 'Request Accepted', 'Request Rejected', 'Announcement', 'Other'])), name='notification_app_notification_notification_type_check_cons'),
        ),
    ]
