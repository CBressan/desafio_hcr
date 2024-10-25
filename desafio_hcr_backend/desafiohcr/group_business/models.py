from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class GroupBusiness(models.Model):
    name = models.CharField(max_length=250)
    corporate_name = models.CharField(max_length=200)
    doc_number = models.CharField(max_length=14)
    phone = models.CharField(max_length=11)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=128)
    country = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=8)
    address = models.CharField(max_length=500)
    num_address = models.IntegerField()
    city = models.CharField(max_length=500)
    state = models.CharField(max_length=500)
    complement = models.CharField(max_length=500, blank=True, null=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    @property
    def is_authenticated(self):
        return True

    def __str__(self):
        return self.name
