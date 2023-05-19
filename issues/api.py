from django.shortcuts import render
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from .models import Issue, Address, User
import json

def insertIssue(request):
    if request.method == 'POST':
        json_data = json.loads(request.body.decode("utf-8"))
        data = json_data['data']

        addressData = data['address']
        issueAddress = Address(
            street=addressData['street'],
            neighborhood=addressData['neighborhood'],
            city=addressData['city'],
            state=addressData['state'],
            zip_code=addressData['zipCode']
        )
        issueAddress.save()
        test = User(name="Mateus",username="mmazzei",sex="male",cpf="12345678989")
        test.save()

        if(issueAddress.id):
            issueRecord = Issue(
                name = data["name"],
                address = issueAddress,
                issue_type = data["type"],
                status = data["status"],
                send_by = test
            )
            issueRecord.save()
        
        return JsonResponse({'answer': issueAddress.id})

def getIssues(request):
    if request.method == 'GET':
        allIssues = list(Issue.objects.all().values())
        for i in range(len(allIssues)):
            current = allIssues[i]
            allIssues[i]['address'] = list(Address.objects.filter(id=current['address_id']).values())[0]
            allIssues[i]['send_by'] = list(User.objects.filter(id=current['send_by_id']).values_list('name'))[0]

        return JsonResponse(allIssues, safe=False)

def insertUser(request):
    if request.method == 'POST':
            json_data = json.loads(request.body.decode("utf-8"))
            data = json_data['data']

            users = list(User.objects.filter(username=data['username']).values())
            if(users.__len__() > 0):
                return JsonResponse({'error': True, 'msg': 'Username indisponivel.'})

            person = User(name=data['name'],username=data['username'],password=data['password'],sex=data['sex'],cpf=data['cpf'])
            person.save()
            return JsonResponse({'answer': {
                'name': person.name,
                'sex': person.sex,
                'id': person.id,
                'logged': True
            }}, safe=False)

def getSession(request):
    if request.method == 'POST':
            json_data = json.loads(request.body.decode("utf-8"))
            data = json_data['data']

            user = list(User.objects.filter(username=data['username'],password=data['password']).values())[0]
            if(user and user['id']):
                return JsonResponse({'answer': user}, safe=False)
            else:
                return JsonResponse(
                    {
                        'answer': {
                            'sex': 'default',
                            'logged': True
                        }
                    }, safe=False)