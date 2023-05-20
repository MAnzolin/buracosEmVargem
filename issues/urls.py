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
    path('get-all-issues', api.getAllIssues),
    path('get-issue', api.getIssue),
    path('insert-issue', api.insertIssue),
    path('update-issue', api.updateIssue),
    path('insert-user', api.insertUser),
    path('update-user', api.updateUser),
    path('get-session', api.getSession)
]