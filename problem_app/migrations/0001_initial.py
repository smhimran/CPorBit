# Generated by Django 3.2.7 on 2021-12-07 08:14

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cf_problem_id', models.CharField(max_length=20, unique=True)),
                ('cf_problem_index', models.CharField(max_length=20, null=True)),
                ('cf_contest_id', models.IntegerField(default=0, null=True)),
                ('cf_problem_name', models.CharField(max_length=100, null=True)),
                ('score', models.IntegerField(default=0)),
                ('timestamp_updated', models.DateTimeField(default=datetime.datetime(2021, 12, 7, 8, 14, 0, 197317, tzinfo=utc))),
                ('tag', models.ManyToManyField(to='problem_app.Tag')),
            ],
        ),
        migrations.CreateModel(
            name='AcceptedSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cf_submission_id', models.IntegerField(default=0, unique=True)),
                ('timestamp', models.DateTimeField(default=datetime.datetime(2021, 12, 7, 8, 14, 0, 198232, tzinfo=utc))),
                ('participantType', models.CharField(choices=[('CONTESTANT', 'Contestant'), ('PRACTICE', 'Practice'), ('VIRTUAL', 'Virtual'), ('MANAGER', 'Manager'), ('OUT_OF_COMPETITION', 'Out_of_competition')], default='PRACTICE', max_length=20)),
                ('current_rating', models.IntegerField(default=0)),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problem_app.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
