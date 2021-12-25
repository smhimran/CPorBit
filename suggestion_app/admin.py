from django.contrib import admin

from suggestion_app.models import (Favorite, Suggestion, Recommendation)

# Register your models here.
admin.site.register(Favorite)
admin.site.register(Suggestion)
admin.site.register(Recommendation)
