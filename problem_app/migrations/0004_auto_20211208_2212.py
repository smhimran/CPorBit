# Generated by Django 3.2.7 on 2021-12-08 22:12

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('problem_app', '0003_auto_20211207_0814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acceptedsubmission',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 8, 22, 12, 22, 435134, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='problem',
            name='timestamp_updated',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 8, 22, 12, 22, 434210, tzinfo=utc)),
        ),
    ]