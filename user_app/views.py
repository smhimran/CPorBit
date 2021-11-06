from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from user_app.models import Profile
from user_app.permissions.UserPermissions import IsOwnerOrReadOnly
from user_app.serializers.ProfileSerializer import ProfileSerializer


class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

