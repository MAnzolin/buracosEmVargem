from django.shortcuts import render

def index(request):
    return render(request, "index.html")

def login(request):
    return render(request, "login.html")

def menu(request):
    return render(request, "menu.html")

def myIssues(request):
    return render(request, "my-issues.html")

def profile(request):
    return render(request, "profile.html")

def singUp(request):
    return render(request, "sing-up.html")