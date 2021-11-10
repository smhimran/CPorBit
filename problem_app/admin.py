from django.contrib import admin

from problem_app.models import AcceptedSubmission, Problem, Tag

# Register your models here.
admin.site.register(Tag)
admin.site.register(Problem)
admin.site.register(AcceptedSubmission)
