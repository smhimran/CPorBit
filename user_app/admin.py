from django.contrib import admin

from user_app.models import Mentee, MentorshipRequest, Profile

# Register your models here.
admin.site.register(Profile)
admin.site.register(Mentee)
admin.site.register(MentorshipRequest)
