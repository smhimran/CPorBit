from django.contrib import admin

from suggestion_app.models import Favorite, MentorSuggestion, SuggestedProblem

# Register your models here.
admin.site.register(Favorite)
admin.site.register(SuggestedProblem)
admin.site.register(MentorSuggestion)
