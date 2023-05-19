from django.urls import path
from . import views
from . import api

urlpatterns = [
    path('', views.index),
    path('login', views.login),
    path('menu', views.menu),
    path('my-issues', views.myIssues),
    path('profile', views.profile),
    path('sing-up', views.singUp),
    path('get-issues', api.getIssues),
    path('insert-issues', api.insertIssue),
    path('insert-user', api.insertUser),
    path('update-user', api.updateUser),
    path('get-session', api.getSession)
]