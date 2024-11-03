from rest_framework import serializers
from group_business.models import GroupBusiness
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        try:
            group_business = GroupBusiness.objects.get(email=email)
        except GroupBusiness.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        if not group_business.check_password(password):
            raise serializers.ValidationError("Invalid email or password.")

        return group_business


class CustomJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            return None

        return super().authenticate(request)

    def get_user(self, validated_token):
        group_business_id = validated_token.get('group_business_id')

        if group_business_id is None:
            raise AuthenticationFailed('Token contained no recognizable group_business identification')

        try:
            return GroupBusiness.objects.get(id=group_business_id)
        except GroupBusiness.DoesNotExist:
            raise AuthenticationFailed('GroupBusiness not found')
