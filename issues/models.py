from django.db import models
import datetime

class User(models.Model):
   name = models.CharField(max_length=100)
   username = models.CharField(max_length=40)
   sex = models.CharField(max_length=4)
   cpf = models.CharField(max_length=11)
   id = models.AutoField(primary_key=True) 

class Address(models.Model):
   street = models.CharField(max_length=100)
   neighborhood = models.CharField(max_length=100)
   city = models.CharField(max_length=100)
   state = models.CharField(max_length=4)
   zip_code = models.CharField(max_length=8)
   id = models.AutoField(primary_key=True)

class Issue(models.Model):
   name = models.CharField(max_length=100)
   address = models.ForeignKey(Address, on_delete=models.DO_NOTHING)
   issue_type = models.CharField(max_length=40)
   status = models.CharField(max_length=40)
   send_by = models.ForeignKey(User, on_delete=models.CASCADE)
   created_at = models.DateTimeField(default=datetime.date.today())
   id = models.AutoField(primary_key=True)