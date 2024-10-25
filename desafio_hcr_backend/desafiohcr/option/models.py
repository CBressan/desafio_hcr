from django.db import models

from question.models import Question


class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text

