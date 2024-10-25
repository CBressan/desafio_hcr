from django.db import models
from business.models import Business


class Question(models.Model):
    question = models.TextField(max_length=100)
    is_multiple_choice = models.BooleanField(default=False)

    business = models.ForeignKey(Business, related_name='questions', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.question} ({self.is_multiple_choice})"
