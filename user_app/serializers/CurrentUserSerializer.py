from django.contrib.auth.models import User
from djoser.serializers import UserSerializer
from rest_framework import fields


class CurrentUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username')
