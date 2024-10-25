# Generated by Django 5.1.2 on 2024-10-23 18:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business', '0001_initial'),
        ('question', '0003_rename_texto_question_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='business',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='business.business'),
        ),
    ]
