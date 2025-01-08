from django.db import models


class PositionSoilData(models.Model):                                                                                                    
    idpositionsoildata = models.CharField(db_column='idPositionSoilData', primary_key=True, max_length=36)  # Field name made lowerc>    date = models.DateTimeField(blank=True, null=True)
    updateat = models.DateTimeField(db_column='updateAt', blank=True, null=True)  # Field name made lowercase.
    z1 = models.FloatField(blank=True, null=True)
    z2 = models.FloatField(blank=True, null=True)
    z3 = models.FloatField(blank=True, null=True)
    z4 = models.FloatField(blank=True, null=True)
    z5 = models.FloatField(blank=True, null=True)
    z6 = models.FloatField(blank=True, null=True)
    z7 = models.FloatField(blank=True, null=True)
    z8 = models.FloatField(blank=True, null=True)
    z9 = models.FloatField(blank=True, null=True)
    z10 = models.FloatField(blank=True, null=True)
    z11 = models.FloatField(blank=True, null=True)
    z12 = models.FloatField(blank=True, null=True)
    z13 = models.FloatField(blank=True, null=True)
    z14 = models.FloatField(blank=True, null=True)
    z15 = models.FloatField(blank=True, null=True)
    b0 = models.FloatField(blank=True, null=True)
    b1 = models.FloatField(blank=True, null=True)
    chlorides = models.FloatField(blank=True, null=True)
    id_contactperson = models.ForeignKey('ContactPerson', models.DO_NOTHING, db_column='idContactPerson')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PositionSoilData'
