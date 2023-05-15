from django.shortcuts import render
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
import json

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

def getIssues(request):
    if request.method == 'POST':
        json_data = json.loads(request.body.decode("utf-8"))
        return JsonResponse(json_data)
        #return HttpResponse(json_data['data'])
