from django.db import models


class Constants(models.Model):
    id_constants = models.AutoField(db_column='idConstants', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=100)
    value = models.FloatField()
    unit = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'Constants'
