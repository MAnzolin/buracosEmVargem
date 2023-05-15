from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('login', views.login),
    path('menu', views.menu),
    path('my-issues', views.myIssues),
    path('profile', views.profile),
    path('sing-up', views.singUp),
    path('get-issues', views.getIssues)
]