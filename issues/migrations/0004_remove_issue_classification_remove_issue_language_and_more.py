# Generated by Django 4.2 on 2023-05-16 00:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('issues', '0003_rename_issues_issue_rename_users_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='issue',
            name='classification',
        ),
        migrations.RemoveField(
            model_name='issue',
            name='language',
        ),
        migrations.RemoveField(
            model_name='issue',
            name='my_issue',
        ),
    ]