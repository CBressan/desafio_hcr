from django.db import models
from group_business.models import GroupBusiness


class Business(models.Model):
    group_business = models.ForeignKey(GroupBusiness, related_name='businesses', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    corporate_name = models.CharField(max_length=200)
    doc_number = models.CharField(max_length=14)
    phone = models.CharField(max_length=11)
    email = models.EmailField(max_length=200)
    country = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=8)
    address = models.CharField(max_length=200)
    num_address = models.IntegerField()
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    complement = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name
