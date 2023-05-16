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
        
        #issue = Issue(name=data['name'],classification=data['name'],name=data['name'])
        return JsonResponse({'answer': issueAddress.id})

