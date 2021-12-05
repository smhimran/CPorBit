from typing import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class NotificationPagination(PageNumberPagination):
    page_size = 1000

    def get_paginated_response(self, data, unread):
        return Response(
            OrderedDict([
             ('unread', unread),
             ('results', data)
         ])
        )
