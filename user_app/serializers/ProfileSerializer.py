from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from user_app.models import Profile


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
