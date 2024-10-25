from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Option
from .serializers import OptionSerializer
from django.shortcuts import get_object_or_404

from question.models import Question


class OptionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        if id:
            option = get_object_or_404(Option, id=id)
            serializer = OptionSerializer(option)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        options = Option.objects.all()
        serializer = OptionSerializer(options, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        question_id = request.data.get('question_id')  # Alterado para question_id
        if not question_id:
            return Response({"status": "error", "data": "Question ID is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        question = get_object_or_404(Question, id=question_id)

        if not question.is_multiple_choice:
            return Response({"status": "error", "data": "Cannot add options to a non-multiple choice question."},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = OptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)

        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        option = get_object_or_404(Option, id=id)

        question_id = request.data.get('question_id')
        if question_id:
            question = get_object_or_404(Question, id=question_id)

            if not question.is_multiple_choice:
                return Response(
                    {"status": "error", "message": "Cannot update option for a non-multiple choice question."},
                    status=status.HTTP_400_BAD_REQUEST)

        serializer = OptionSerializer(option, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        option = get_object_or_404(Option, id=id)
        option.delete()
        return Response({"status": "success", "data": "Option deleted"}, status=status.HTTP_204_NO_CONTENT)
