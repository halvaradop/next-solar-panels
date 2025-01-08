from django.db import models


class Address(models.Model):
    id_address = models.AutoField(db_column='idAddress', primary_key=True)  # Field name made lowercase.
    country = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    postbox = models.CharField(max_length=255, blank=True, null=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    number = models.CharField(max_length=255, blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    is_active = models.CharField(db_column='isActive', max_length=8, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Address'
