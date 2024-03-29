# Generated by Django 3.2.7 on 2021-12-16 17:05

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('problem_app', '0003_auto_20211216_2305'),
        ('suggestion_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Recommendation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.CharField(blank=True, max_length=300, null=True)),
                ('timestamp', models.DateTimeField(default=datetime.datetime(2021, 12, 16, 23, 5, 3, 563073, tzinfo=utc))),
                ('mentor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Mentor', to=settings.AUTH_USER_MODEL)),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problem_app.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Suggestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=datetime.datetime(2021, 12, 16, 23, 5, 3, 562034, tzinfo=utc))),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problem_app.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='suggestedproblem',
            name='problem',
        ),
        migrations.RemoveField(
            model_name='suggestedproblem',
            name='user',
        ),
        migrations.AddField(
            model_name='favorite',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 16, 23, 5, 3, 562034, tzinfo=utc)),
        ),
        migrations.DeleteModel(
            name='MentorSuggestion',
        ),
        migrations.DeleteModel(
            name='SuggestedProblem',
        ),
    ]
