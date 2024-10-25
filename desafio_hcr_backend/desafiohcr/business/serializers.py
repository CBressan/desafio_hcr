from rest_framework import serializers
from .models import Business


class BusinessSerializer(serializers.ModelSerializer):
    group_business_id = serializers.IntegerField()

    class Meta:
        model = Business
        fields = ['id', 'group_business_id', 'name', 'corporate_name', 'doc_number', 'phone', 'email',
                  'country', 'postal_code', 'address', 'num_address', 'city', 'state', 'complement']
