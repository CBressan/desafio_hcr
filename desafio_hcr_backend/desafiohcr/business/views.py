from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Business
from .serializers import BusinessSerializer
from group_business.models import GroupBusiness


class BusinessView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        group_business_id = request.query_params.get('group_business_id')

        if id:
            business = get_object_or_404(Business, id=id)
            serializer = BusinessSerializer(business)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

        if group_business_id:
            businesses = Business.objects.filter(group_business_id=group_business_id)
        else:
            businesses = Business.objects.all()

        serializer = BusinessSerializer(businesses, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        group_business_id = request.data.get('group_business_id')
        if not group_business_id:
            return Response({"status": "error", "data": "Group Business ID is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        group_business = get_object_or_404(GroupBusiness, id=group_business_id)

        serializer = BusinessSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        business = get_object_or_404(Business, id=id)

        group_business_id = request.data.get('group_business_id')
        if group_business_id:
            group_business = get_object_or_404(GroupBusiness, id=group_business_id)

        serializer = BusinessSerializer(business, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        business = get_object_or_404(Business, id=id)
        business.delete()
        return Response({"status": "success", "data": "Business deleted"}, status=status.HTTP_204_NO_CONTENT)
