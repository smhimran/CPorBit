from rest_framework import serializers
from user_app.models import Mentee
from user_app.serializers.CurrentUserSerializer import CurrentUserSerializer


class MenteeSerializer(serializers.ModelSerializer):
    mentor = CurrentUserSerializer(read_only=True)
    mentee = CurrentUserSerializer(read_only=True)

    class Meta:
        model = Mentee
        fields = ('id', 'mentor', 'mentee', 'status')
