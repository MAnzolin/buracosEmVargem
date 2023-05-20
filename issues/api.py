from django.shortcuts import render
from django.http import HttpResponse, HttpResponseServerError, JsonResponse
from .models import Issue, Address, User
import json

def insertIssue(request):
    if request.method == 'POST':
        #try:
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
            sendBy = User.objects.get(id=data['sendBy'])

            if(issueAddress.id and sendBy.id):
                issueRecord = Issue(
                    name = data["name"],
                    address = issueAddress,
                    issue_type = data["type"],
                    status = data["status"],
                    send_by = sendBy
                )
                issueRecord.save()
                return JsonResponse({'answer': {'record':issueRecord.id}})
            else:
                return JsonResponse({'answer': {'error': True, 'msg': '1Não foi possível cadastrar o seu item.'}})
        #except:
            return JsonResponse({'answer': {'error': True, 'msg': '2Não foi possível cadastrar o seu item.'}})

def updateIssue(request):
    if request.method == 'POST':
        json_data = json.loads(request.body.decode("utf-8"))
        data = json_data['data']
        addressData = data['address']
        issueRecord = Issue.objects.get(id=data['id'])
        errorResponse = {'answer': {'error': True, 'msg': 'Não foi possível cadastrar o seu item.'}}

        try:
            issueAddress = Address.objects.get(id=issueRecord.address_id)
            if(issueAddress.id):
                if(addressData['street']):
                    issueAddress.street = addressData['street']
                if(addressData['neighborhood']):
                    issueAddress.neighborhood = addressData['neighborhood']
                if(addressData['city']):
                    issueAddress.city = addressData['city']
                if(addressData['state']):
                    issueAddress.state = addressData['state']
                if(addressData['zipCode']):
                    issueAddress.zipCode = addressData['zipCode']
                issueAddress.save()

            if(issueRecord.id):
                if(data["name"]):
                    issueRecord.name = data["name"]
                if(data["type"]):
                    issueRecord.issue_type = data["type"]
                if(data["status"]):
                    issueRecord.status = data["status"]
                issueRecord.save()
            else:
                return JsonResponse(errorResponse)

            return JsonResponse({'answer': {'record':data}})

        except:
            return JsonResponse(errorResponse)

def getAllIssues(request):
    if request.method == 'GET':
        allIssues = list(Issue.objects.all().values())
        for i in range(len(allIssues)):
            current = allIssues[i]
            allIssues[i]['address'] = list(Address.objects.filter(id=current['address_id']).values())[0]
            allIssues[i]['send_by'] = list(User.objects.filter(id=current['send_by_id']).values_list('name'))[0]

        return JsonResponse(allIssues, safe=False)

def getIssue(request):
    if request.method == 'GET':
        id = request.GET['record']
        record = Issue.objects.get(id=id)
        if record.id:
            issueAddress = Address.objects.get(id=record.address_id)
            return JsonResponse({
                            'answer': {
                                'name': record.name,
                                'type': record.issue_type,
                                'status': record.status,
                                'sendBy': record.send_by_id,
                                'address': {
                                    'zipCode': issueAddress.zip_code,
                                    'street': issueAddress.street,
                                    'city': issueAddress.city,
                                    'neighborhood': issueAddress.neighborhood,
                                    'state': issueAddress.state
                                },
                                'id': record.id
                            }}, safe=False)
        return JsonResponse({'answer': {'error': True, 'msg': 'Não foi possível encontrar o seu item.'}})


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

def updateUser(request):
    if request.method == 'POST':
            json_data = json.loads(request.body.decode("utf-8"))
            data = json_data['data']

            user = User.objects.get(id=data['id'])
            if (user.id):
                if(data['name']):
                    user.name = data['name']
                if(data['username']):
                    user.username = data['username']
                if(data['sex']):
                    user.sex = data['sex']
                if(data['cpf']):
                    user.cpf = data['cpf']
                if(data['password']):
                    user.password = data['password']
                user.save()
                return JsonResponse({'answer': { 'msg': 'Usuário atualizado com sucesso', 'updated': True}}, safe=False)
            else:
                return JsonResponse({'answer': {'error': True, 'msg': 'Erro ao atualizar.'}})

def getSession(request):
    if request.method == 'POST':
            json_data = json.loads(request.body.decode("utf-8"))
            data = json_data['data']
            errorJS = {'answer': {'sex': 'default', 'logged': True, 'msg': 'Usuário não encontrado ou senha inválida.'}}

            try:
                user = User.objects.get(username=data['username'],password=data['password'])
                if(user.id):
                    return JsonResponse({'answer': {
                        'name': user.name,
                        'sex': user.sex,
                        'cpf': user.cpf,
                        'username': user.username,
                        'id': user.id
                    }}, safe=False)
                else:
                    return JsonResponse(errorJS, safe=False)
            except:
                return JsonResponse(errorJS, safe=False)