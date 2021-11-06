from djoser.serializers import UserCreateSerializer


class RegistrationSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ('first_name', 'last_name', 'email', 'username', 'password')
