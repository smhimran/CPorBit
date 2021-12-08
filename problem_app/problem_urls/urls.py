from django.urls import path
from problem_app.problem_urls.views import (ProblemListAV, ProblemAV)

urlpatterns = [
    path('', ProblemListAV.as_view(), name='all-problems'),
    path('<cf_problem_id>/', ProblemAV.as_view(), name='problem-details'),
]