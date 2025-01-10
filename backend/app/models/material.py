from django.db import models


class Material(models.Model):
    idmaterial = models.AutoField(db_column='idMaterial', primary_key=True)  # Field name made lowercase.
    matarialtype = models.CharField(db_column='matarialType', max_length=100)  # Field name made lowercase.
    epotential = models.FloatField(db_column='ePotential')  # Field name made lowercase.
    valency = models.IntegerField()
    molarmass = models.FloatField(db_column='molarMass')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Material'
