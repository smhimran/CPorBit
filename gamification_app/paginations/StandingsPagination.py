from typing import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class StandingsPagination(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        return Response(
            OrderedDict([
             ('current', self.page.number),
             ('next', self.get_next_link()),
             ('previous', self.get_previous_link()),
             ('last_page', self.page.paginator.num_pages),
             ('results', data)
         ])
        )
