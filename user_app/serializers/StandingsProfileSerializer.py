from rest_framework import serializers
from user_app.models import Profile


class StandingsProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('cf_handle', 'university')
