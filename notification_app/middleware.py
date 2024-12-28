import logging

from channels.db import database_sync_to_async
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import AnonymousUser
from urllib.parse import parse_qs


logger = logging.getLogger(__name__)


@database_sync_to_async
def get_user_from_token(token_key):
    """
    Validate token and return associated user or AnonymousUser.
    """
    try:
        logger.info(f"token: {token_key}")
        token_auth = TokenAuthentication()
        token = token_auth.authenticate_credentials(token_key)
        logger.info(token)
        return token[0]
    except Exception as e:
        logger.info(token_key)
        logger.error(f"{token_key} {e}")
        return AnonymousUser()


class TokenAuthMiddleware:
    """
    Custom middleware to authenticate WebSocket connections using tokens.
    """

    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        # Parse query parameters
        query_string = parse_qs(scope["query_string"].decode())
        token_key = query_string.get("token", [None])[0]

        # Get the user associated with the token
        logger.info(f"token: {token_key}")
        scope["user"] = await get_user_from_token(token_key)

        # Pass control to the next middleware or consumer
        return await self.inner(scope, receive, send)
