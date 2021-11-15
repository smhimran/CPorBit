from gamification_app.models import ScoreBoard
from rest_framework import serializers


class StandingsScoreBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreBoard
        fields = ('score', 'streak')
