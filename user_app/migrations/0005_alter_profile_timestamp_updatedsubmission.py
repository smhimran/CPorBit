# Generated by Django 3.2.7 on 2024-12-18 06:26

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0004_alter_profile_timestamp_updatedsubmission'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='timestamp_updatedsubmission',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 18, 6, 26, 14, 896994, tzinfo=utc)),
        ),
    ]
