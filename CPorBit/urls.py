"""CPorBit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),

    # Path to the user_app
    path('api/user/', include('user_app.urls')),

    # Path to gamification_app

    path('api/standings/', include('gamification_app.urls')),

    # Path to the notification_app
    path('api/notifications/', include('notification_app.urls')),
    
    # Path to problem_app submission url
    path('api/submission/', include('problem_app.submission_urls.urls')),
    
    # Path to problem_app problem url
    path('api/problem/', include('problem_app.problem_urls.urls')),
    
    # Path to suggestion_app favorite url
    path('api/favorite/', include('suggestion_app.favorite_urls.urls')),
    
    # Path to suggestion_app favorite url
    path('api/recommendation/', include('suggestion_app.recommend_urls.urls')),
    
    # Path to suggestion_app suggestion url
    path('api/suggestion/', include('suggestion_app.suggestion_urls.urls')),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
] + static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
