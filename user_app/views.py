from django.contrib.auth.models import User
from notification_app.models import Notification
from rest_framework import response, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from user_app.models import Mentee, Profile
from user_app.permissions.UserPermissions import (IsMentorOrMenteeOrReadOnly,
                                                  IsOwnerOrReadOnly)
from user_app.serializers.MentorshipSerializer import MenteeSerializer
from user_app.serializers.ProfileSerializer import ProfileSerializer


class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)


class MenteeViewset(viewsets.ModelViewSet):
    serializer_class = MenteeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsMentorOrMenteeOrReadOnly)

    def get_queryset(self):
        username = self.request.GET.get('username') or self.request.user.username
        user = User.objects.get(username=username)
        return  Mentee.objects.filter(mentor=user, status='CURRENT')

    @action(detail=False, methods=['post'])
    def request_to_be_mentee(self, request):
        mentee_username = request.data.get('mentee')
        mentee = User.objects.get(username=mentee_username)
        user = request.user
        mentorship_request = Mentee.objects.create(mentor=user, mentee=mentee, status='REQUESTED_FROM_MENTOR')
        mentorship_request.save()
        notification = Notification.objects.create(user=mentee, notification_type='Connection Request')
        notification.save()
        return Response(status=201, data={'message': 'Request sent successfully!'})


    @action(detail=False, methods=['post'])
    def request_to_be_mentor(self, request):
        mentor_username = request.data.get('mentor')
        mentor = User.objects.get(username=mentor_username)
        user = request.user
        mentorship_request = Mentee.objects.create(mentor=mentor, mentee=user, status='REQUESTED_FROM_MENTEE')
        mentorship_request.save()
        notification = Notification.objects.create(user=mentor, notification_type='Connection Request')
        notification.save()
        return Response(status=201, data={'message': 'Request sent successfully!'})


    @action(detail=False, methods=['get'])
    def get_current_mentor(self, request):
        username = request.GET.get('username') or request.user.username
        user = User.objects.get(username=username)
        mentors = Mentee.objects.filter(mentee=user, status='CURRENT')
        serialized = MenteeSerializer(mentors, many=True)
        return Response(data=serialized.data, status=200)


    @action(detail=False, methods=['get'])
    def get_pending_requests(self, request):
        if request.user.is_authenticated:
            mentors = Mentee.objects.filter(mentee=request.user, status='REQUESTED_FROM_MENTEE')
            mentees = Mentee.objects.filter(mentor=request.user, status='REQUESTED_FROM_MENTOR')
            pending_list = mentors | mentees
            serialized = MenteeSerializer(pending_list, many=True)
            return Response(data=serialized.data, status=200)
        
        else:
            return Response(status=401, data={'message': 'Authentication credentials were not provided.'})


    @action(detail=False, methods=['get'])
    def get_requests_to_be_mentor(self, request):
        if request.user.is_authenticated:
            mentors = Mentee.objects.filter(mentor=request.user, status='REQUESTED_FROM_MENTEE')
            serialized = MenteeSerializer(mentors, many=True)
            return Response(data=serialized.data, status=200)
        
        else:
            return Response(status=401, data={'message': 'Authentication credentials were not provided.'})

    @action(detail=False, methods=['get'])
    def get_requests_to_be_mentee(self, request):
        if request.user.is_authenticated:
            mentees = Mentee.objects.filter(mentee=request.user, status='REQUESTED_FROM_MENTOR')
            serialized = MenteeSerializer(mentees, many=True)
            return Response(data=serialized.data, status=200)
        
        else:
            return Response(status=401, data={'message': 'Authentication credentials were not provided.'})


    @action(detail=False, methods=['get'])
    def get_past_mentors(self, request):
        if request.user.is_authenticated:
            mentors = Mentee.objects.filter(mentee=request.user, status='FORMER')
            serialized = MenteeSerializer(mentors, many=True)
            return Response(data=serialized.data, status=200)

        else:
            return Response(status=401, data={'message': 'Authentication credentials were not provided.'})

    
    @action(detail=False, methods=['get'])
    def get_past_mentees(self, request):
        if request.user.is_authenticated:
            mentees = Mentee.objects.filter(mentor=request.user, status='FORMER')
            serialized = MenteeSerializer(mentees, many=True)
            return Response(data=serialized.data, status=200)

        else:
            return Response(status=401, data={'message': 'Authentication credentials were not provided.'})


    @action(detail=False, methods=['put'], url_path='accept_request/(?P<request_id>[^/.]+)')
    def accept_request(self, request, request_id):
        mentorship_request = Mentee.objects.filter(id=request_id)
        if mentorship_request[0].status == 'REQUESTED_FROM_MENTOR':
            notification = Notification.objects.create(user=mentorship_request[0].mentor, notification_type='Request Accepted')
            notification.save()
        elif mentorship_request[0].status == 'REQUESTED_FROM_MENTEE':
            notification = Notification.objects.create(user=mentorship_request[0].mentee, notification_type='Request Accepted')
            notification.save()
        mentorship_request.update(status='CURRENT')
        return Response(status=200, data={'message': 'Request accepted successfully!'})


    @action(detail=False, methods=['put'], url_path='reject_request/(?P<request_id>[^/.]+)')
    def reject_request(self, request, request_id):
        mentorship_request = Mentee.objects.filter(id=request_id)
        if mentorship_request[0].status == 'REQUESTED_FROM_MENTOR':
            notification = Notification.objects.create(user=mentorship_request[0].mentor, notification_type='Request Rejected')
            notification.save()
        elif mentorship_request[0].status == 'REQUESTED_FROM_MENTEE':
            notification = Notification.objects.create(user=mentorship_request[0].mentee, notification_type='Request Rejected')
            notification.save()
        mentorship_request.delete()
        return Response(status=200, data={'message': 'Request rejected successfully!'})
