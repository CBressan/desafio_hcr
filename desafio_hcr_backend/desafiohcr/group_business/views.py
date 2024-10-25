from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import GroupBusiness
from .serializers import GroupBusinessSerializer


class GroupBusinessView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        if id:
            group_business = get_object_or_404(GroupBusiness, id=id)
            serializer = GroupBusinessSerializer(group_business)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        group_businesses = GroupBusiness.objects.all()
        serializer = GroupBusinessSerializer(group_businesses, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = GroupBusinessSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        group_business = get_object_or_404(GroupBusiness, id=id)
        serializer = GroupBusinessSerializer(group_business, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        group_business = get_object_or_404(GroupBusiness, id=id)
        group_business.delete()
        return Response({"status": "success", "data": "GroupBusiness deleted"}, status=status.HTTP_204_NO_CONTENT)
