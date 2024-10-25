from rest_framework import serializers
from .models import Question
from option.serializers import OptionSerializer


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)
    business_id = serializers.IntegerField()

    class Meta:
        model = Question
        fields = ['id', 'business_id', 'question', 'is_multiple_choice', 'options']
