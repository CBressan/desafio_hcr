from rest_framework import serializers
from .models import Option


class OptionSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField()

    class Meta:
        model = Option
        fields = ['id', 'question_id', 'text']
