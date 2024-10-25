from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Question
from business.models import Business
from .serializers import QuestionSerializer


class QuestionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        if id:
            question = get_object_or_404(Question, id=id)
            serializer = QuestionSerializer(question)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        business_id = request.data.get('business_id')
        if not business_id or business_id <= 0:
            return Response({"status": "error", "data": "Valid Business ID is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        business = get_object_or_404(Business, id=business_id)

        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        question = get_object_or_404(Question, id=id)

        business_id = request.data.get('business_id')
        if business_id:
            business = get_object_or_404(Business, id=business_id)

        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        question = get_object_or_404(Question, id=id)
        question.delete()
        return Response({"status": "success", "data": "Question deleted"}, status=status.HTTP_204_NO_CONTENT)
