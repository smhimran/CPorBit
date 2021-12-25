from gamification_app.models import ScoreBoard
from problem_app.models import AcceptedSubmission
from rest_framework import serializers


class StandingsScoreBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreBoard
        fields = ('score', 'streak')


class ProfileScoreSerializer(serializers.ModelSerializer):
    solve_count = serializers.SerializerMethodField()

    class Meta:
        model = ScoreBoard
        fields = ('score', 'streak', 'solve_count')

    def get_solve_count(self, obj):
        return AcceptedSubmission.objects.filter(user=obj.user).count()
