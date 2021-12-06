from django.urls import include, path
from problem_app.views import (SubmissionAV, UpdateSubmissionAV)

urlpatterns = [
    path('', SubmissionAV.as_view(), name='all-submission'),
    path('update/', UpdateSubmissionAV.as_view(), name='update-submission'),
]