from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from user_app.models import Profile


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        extra_kwargs = {
            'avatar': {'required': False, 'allow_null': True},
            'university': {'required': False, 'allow_null': True},
        }