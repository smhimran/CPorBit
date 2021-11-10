from django.contrib import admin

from user_app.models import Mentee, Profile, UserStatistic

# Register your models here.
admin.site.register(Profile)
admin.site.register(Mentee)
admin.site.register(UserStatistic)
