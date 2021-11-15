from django.contrib.auth.models import User
from django.db.models import fields
from gamification_app.serializers.ScoreBoardSerializer import \
    StandingsScoreBoardSerializer
from rest_framework import serializers
from user_app.serializers.StandingsProfileSerializer import \
    StandingsProfileSerializer


class StandingsProfileSerializer(serializers.ModelSerializer):
    profile = StandingsProfileSerializer(many=True, read_only=True)
    scoreboard = StandingsScoreBoardSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'profile', 'scoreboard')
