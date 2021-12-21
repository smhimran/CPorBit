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
        try:
            mentee = User.objects.get(username=mentee_username)
            user = request.user

            requests = Mentee.objects.filter(mentor=user, mentee=mentee) | Mentee.objects.filter(mentor=mentee, mentee=user)

            if requests.count() > 0:
                if requests[0].status == 'CURRENT':
                    return response.Response({'message': 'This user is already a connection!'}, status=400)
                elif requests[0].status != 'FORMER':
                    return response.Response({'message': 'There is already a pending request!'}, status=400)

                else:
                    if requests[0].mentor == user:
                        old_request = requests[0]
                        old_request.status = 'REQUESTED_FROM_MENTOR'
                        old_request.save()

                        return response.Response({'message': 'Request sent successfully!'}, status=201)

                    else:
                        old_request = requests[0]
                        old_request.mentor = user
                        old_request.mentee = mentee
                        old_request.status = 'REQUESTED_FROM_MENTOR'
                        old_request.save()

                        return response.Response({'message': 'Request sent successfully!'}, status=201)
                    

            mentorship_request = Mentee.objects.create(mentor=user, mentee=mentee, status='REQUESTED_FROM_MENTOR')
            mentorship_request.save()
            notification = Notification.objects.create(user=mentee, notification_type='Connection Request')
            notification.save()
            return Response(status=201, data={'message': 'Request sent successfully!'})
        
        except User.DoesNotExist:
            return Response(status=404, data={'message': 'User does not exist!'})


    @action(detail=False, methods=['post'])
    def request_to_be_mentor(self, request):
        try:
            mentor_username = request.data.get('mentor')
            mentor = User.objects.get(username=mentor_username)
            user = request.user

            requests = Mentee.objects.filter(mentor=mentor, mentee=user) | Mentee.objects.filter(mentor=user, mentee=mentor)

            if requests.count() > 0:
                if requests[0].status == 'CURRENT':
                    return response.Response({'message': 'This user is already a connection!'}, status=400)
                elif requests[0].status != 'FORMER':
                    return response.Response({'message': 'There is already a pending request!'}, status=400)

                else:
                    if requests[0].mentee == user:
                        old_request = requests[0]
                        old_request.status = 'REQUESTED_FROM_MENTEE'
                        old_request.save()

                        return response.Response({'message': 'Request sent successfully!'}, status=201)

                    else:
                        old_request = requests[0]
                        old_request.mentor = mentor
                        old_request.mentee = user
                        old_request.status = 'REQUESTED_FROM_MENTEE'
                        old_request.save()

                        return response.Response({'message': 'Request sent successfully!'}, status=201)

            mentorship_request = Mentee.objects.create(mentor=mentor, mentee=user, status='REQUESTED_FROM_MENTEE')
            mentorship_request.save()
            notification = Notification.objects.create(user=mentor, notification_type='Connection Request')
            notification.save()
            return Response(status=201, data={'message': 'Request sent successfully!'})
        
        except User.DoesNotExist:
            return Response(status=404, data={'message': 'User does not exist!'})



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
        if mentorship_request[0].status == 'REQUESTED_FROM_MENTOR' and mentorship_request[0].mentee == request.user:
            notification = Notification.objects.create(user=mentorship_request[0].mentor, notification_type='Request Accepted')
            notification.save()
            mentorship_request.update(status='CURRENT')
        elif mentorship_request[0].status == 'REQUESTED_FROM_MENTEE' and mentorship_request[0].mentor == request.user:
            notification = Notification.objects.create(user=mentorship_request[0].mentee, notification_type='Request Accepted')
            notification.save()
            mentorship_request.update(status='CURRENT')
        else:
            return Response(status=403, data={'message': 'You do not have permission to accpet this request!'})
        return Response(status=200, data={'message': 'Request accepted successfully!'})


    @action(detail=False, methods=['put'], url_path='reject_request/(?P<request_id>[^/.]+)')
    def reject_request(self, request, request_id):
        mentorship_request = Mentee.objects.filter(id=request_id)
        if mentorship_request[0].status == 'REQUESTED_FROM_MENTOR' and mentorship_request[0].mentee == request.user:
            notification = Notification.objects.create(user=mentorship_request[0].mentor, notification_type='Request Rejected')
            notification.save()
            mentorship_request.delete()
        elif mentorship_request[0].status == 'REQUESTED_FROM_MENTEE' and mentorship_request[0].mentor == request.user:
            notification = Notification.objects.create(user=mentorship_request[0].mentee, notification_type='Request Rejected')
            notification.save()
            mentorship_request.delete()
        else:
            return Response(status=403, data={'message': 'You do not have permission to reject this request!'})
        return Response(status=200, data={'message': 'Request rejected successfully!'})


    @action(detail=False, methods=['get'])
    def is_connection_or_requested(self, request):
        if request.user.is_authenticated:
            username = request.data.get('username')
            try:
                user = User.objects.get(username=username)

                request_list = Mentee.objects.filter(mentee=request.user, mentor=user) | Mentee.objects.filter(mentor=request.user, mentee=user)

                if request_list:
                    return Response(status=200, data={'status': request_list[0].status})
                else:
                    return Response(status=200, data={'status': 'NOT_CONNECTED'})
            
            except User.DoesNotExist:
                return Response(status=404, data={'message': 'User does not exist!'})
        
        else:
            return Response(status=401, data={'message': 'Authentication credentials were not provided.'})


    @action(detail=False, methods=['post'])
    def close_connection(self, request):
        if request.user.is_authenticated:
            username = request.data.get('username')
            try:
                user = User.objects.get(username=username)
                mentorships = Mentee.objects.filter(mentor=request.user, mentee=user, status='CURRENT') | Mentee.objects.filter(mentee=request.user, mentor=user, status='CURRENT')

                if mentorships:
                    mentorships[0].status = 'FORMER'
                    mentorships[0].save()
                    return Response(status=200, data={'message': 'Connection closed successfully!'})
                
                else:
                    return Response(status=403, data={'message': 'Request failed!'})
                
            except User.DoesNotExist:
                return Response(status=404, data={'message': 'User does not exist!'})

        else:
            return Response(status=401, data={'message': 'Authentication credentials were not provided.'})

    
    @action(detail=False, methods=['post'], url_path='cancel_pending_request/(?P<request_id>[^/.]+)')
    def cancel_pending_request(self, request, request_id):
        if request.user.is_authenticated:
            
            mentorships = Mentee.objects.filter(id=request_id)

            if mentorships[0].mentee == request.user and mentorships[0].status == 'REQUESTED_FROM_MENTEE':
                mentorships[0].delete()
                return Response(status=200, data={'message': 'Request cancelled successfully!'})
            
            elif mentorships[0].mentor == request.user and mentorships[0].status == 'REQUESTED_FROM_MENTOR':
                mentorships[0].delete()
                return Response(status=200, data={'message': 'Request cancelled successfully!'})
            
            else:
                return Response(status=403, data={'message': 'Request failed!'})


        else:
            return Response(status=401, data={'message': 'Authentication credentials were not provided.'})
