from rest_framework.pagination import PageNumberPagination


class StandingsPagination(PageNumberPagination):
    page_size = 20
