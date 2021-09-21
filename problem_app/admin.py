from django.contrib import admin

from problem_app.models import (AcceptedSubmission, Problem, ProblemStatistic,
                                Tag)

# Register your models here.
admin.site.register(Tag)
admin.site.register(Problem)
admin.site.register(ProblemStatistic)
admin.site.register(AcceptedSubmission)
