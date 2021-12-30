# Generated by Django 3.2.7 on 2021-12-29 08:21

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('problem_app', '0005_auto_20211228_2108'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='problem',
            options={'ordering': ['cf_problem_id']},
        ),
        migrations.AlterField(
            model_name='acceptedsubmission',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 29, 14, 21, 35, 632617, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='problem',
            name='timestamp_updated',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 29, 14, 21, 35, 631620, tzinfo=utc)),
        ),
    ]
