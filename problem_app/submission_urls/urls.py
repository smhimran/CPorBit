from django.urls import path
from problem_app.submission_urls.views import SubmissionAV, UpdateSubmissionAV

urlpatterns = [
    path('', SubmissionAV.as_view(), name='all-submission'),
    path('update/', UpdateSubmissionAV.as_view(), name='update-submission'),
]
