from rest_framework import serializers
from .models import GroupBusiness


class GroupBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupBusiness
        fields = ['id', 'name', 'corporate_name', 'doc_number', 'phone', 'email', 'password', 'country',
                  'postal_code', 'address', 'num_address', 'city', 'state', 'complement']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        group_business = GroupBusiness(**validated_data)
        if password:
            group_business.set_password(password)
        group_business.save()
        return group_business

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)
